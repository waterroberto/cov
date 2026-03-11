import { NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/config/firebaseAdmin';

export async function GET() {
  return NextResponse.json({ message: 'Firebase Admin API is active' });
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { action, uid, userId } = body;

    if (action === 'deleteUser') {
      if (!uid) {
        return NextResponse.json({ error: 'UID is required for deletion' }, { status: 400 });
      }
      const adminRef = adminDb.collection('users').doc(userId);
      const adminDoc = await adminRef.get();
      if (!adminDoc.exists || adminDoc.data()?.isAdmin !== true) {
        return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
      }
      const docRef = adminDb.collection('users').doc(uid);

      const doc = await docRef.get();

      
      if (doc.exists) {
        await adminAuth.deleteUser(uid);
        await docRef.delete();
        console.log("user deleted")
      } else {
        console.log('No such document');
      }
      return NextResponse.json({ success: true, message: `User ${uid} deleted successfully` });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status:400 });
  } catch (error: any) {
    console.error('Firebase Admin Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}