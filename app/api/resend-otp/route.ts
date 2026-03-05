import { db } from "@/config/firebase.config";
import { doc, getDoc, setDoc, serverTimestamp, updateDoc } from "firebase/firestore";

export async function POST(req: Request) {
  try {
    const { userId, otp } = await req.json();
    if (!userId) return Response.json({ success: false, error: "Email is required" }, { status: 400 });

    const usersDocRef = doc(db, "users", userId);
    const usersDoc = await getDoc(usersDocRef);

    const now = new Date().getTime();
    if (usersDoc.exists()) {
      const { isOtpCreatedAt, isRequestedOTP } = usersDoc.data();
      if(!isRequestedOTP) return Response.json({ success: false, error: "Request is forbiden"}, {status: 403})
      
      const lastRequestedTime = isOtpCreatedAt.toDate().getTime();
      const cooldown = 30 * 1000; // 30 seconds cooldown

      if (now - lastRequestedTime < cooldown) {
        return Response.json({ success: false, error: "Please wait before requesting a new OTP." }, { status: 429 });
      }
    }

    // Generate a new OTP
    // const newOtp = Math.floor(100000 + Math.random() * 900000).toString();

    // Store new OTP with a fresh timestamp
    await updateDoc(usersDocRef, {
      otpNumber: otp,
      isRequestedOTP: true,
      isOtpCreatedAt: serverTimestamp(),
    });

    console.log(`New OTP for ${userId}: ${otp}`);

    return Response.json({ success: true, message: "New OTP sent successfully" });
  } catch (error) {
    return Response.json({success: false, error: "Something went wrong" }, { status: 500 });
  }
}
