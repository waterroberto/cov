// import admin from "firebase-admin";


// // import serviceAccount from '@/services/hm-finance-llc-firebase-adminsdk-fbsvc-08ee9c6810.json'
// // const serviceAccount = JSON.parse(process.env.NEXT_FIREBASE_ADMIN_SDK || "{}");
// // console.log(serviceAccount, "admin file")

// const serviceAccount = require("../services/hm-finance-llc-firebase-adminsdk-fbsvc-93c7be36fe.json");


// if (!admin.apps.length) {
//   admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: "https:/hm-finance-llc.firebaseio.com"
//     // credential: admin.credential.cert({
//     //   projectId: process.env.NEXT_ADMIN_PROJECT_ID,
//     //   privateKey: process.env.NEXT_ADMIN_PRIVATE_KEY!.replace(/\\n/g, '\n'),
//     //   clientEmail: process.env.NEXT_ADMIN_EMAIL
//     // }),
//   });
// }
// const db = admin.firestore(); // Firestore instance

// export { db, admin };
