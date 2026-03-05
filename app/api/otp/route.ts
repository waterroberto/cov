import { db } from "@/config/firebase.config";
import { doc, getDoc, deleteDoc, updateDoc } from "firebase/firestore";

export async function POST(req: Request) {
  try {
    const { userId, enteredOTP } = await req.json();
    if (!userId || !enteredOTP) {
      return Response.json({success:false, error: "UserId and OTP are required" }, { status: 400 });
    }

    // Fetch stored OTP from Firestore
    const otpDoc = await getDoc(doc(db, "users", userId));
    if (!otpDoc.exists()) {
      return Response.json({ success:false, error: "No OTP request found" }, { status: 404 });
    }

    const { otpNumber, isRequestedOTP, isOtpCreatedAt } = otpDoc.data();

    const expiryTime = 5 * 60 * 1000; // 5 minutes in milliseconds
    const currentTime = new Date().getTime();
    const otpTime = isOtpCreatedAt.toDate().getTime(); // Convert Firestore timestamp to JS Date

    if (currentTime - otpTime > expiryTime) {
      return Response.json({ sucess:false, error: "OTP has expired. Please request a new one." }, { status: 400 });
    }

    console.log(isRequestedOTP, enteredOTP, otpNumber)

    // Validate OTP
    if (!isRequestedOTP || enteredOTP !== otpNumber) {
      return Response.json({success: false, error: "Invalid or expired OTP" }, { status: 400 });
    }

    // Mark user as verified (modify your user collection)
    await updateDoc(doc(db, "users", userId), { emailVerified: true, otpNumber:null, isOtpCreatedAt: null, isRequestedOTP: false });

    // Delete OTP record after successful verification

    return Response.json({ success: true, message: "OTP verified successfully" });
  } catch (error) {
    console.log(error)
    return Response.json({success: false, error: "Something went wrong" }, { status: 500 });
  }
}
