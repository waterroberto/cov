import { NextRequest, NextResponse } from "next/server";





export async function POST(req:Request) {

  const {  userId, newPassword } = await req.json();

  console.log(userId, newPassword)
  if (!userId || !newPassword) {
    return Response.json({ message: "Missing required fields" }, {status: 400});
  }

  try {

    // Update the user's password
    // const user = await admin.auth().updateUser(userId, { password: newPassword });
    // const userRef = db.collection('users').doc(user.uid)
    // await userRef.update({password: newPassword})
    
    // console.log(await admin.auth().createCustomToken(userId))

    return Response.json({ message: "Password updated successfully" }, {status: 200});
  } catch (error) {
    console.log(error)
    return Response.json({ message: "Invalid or expired token", error: error }, {status: 500});
  }
}

