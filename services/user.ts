import { db, storage } from '@/config/firebase.config';
import { IDeposit, InvestmentType, IWITHDRAWAL } from '@/interface';
import generateUniqueCode from '@/utils/generateCode';
import {
  Timestamp,
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import toast from 'react-hot-toast';
import cloudinary  from 'cloudinary';

type DepositUserType =  "admin" | "user"
export const UserService = {
  sendEmail : async function(body: any) {
  try {
    console.log(body, "from user service");

    const response = await fetch("/api/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Ensure JSON is correctly sent
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`something failed! please try again`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, message: "Failed to send email" };
  }
  },

  updateUserPassword: async (body: any) => {
    try {
      console.log(body, "from user service");

      const response = await fetch("/api/update-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Ensure JSON is correctly sent
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`something failed! please try again`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error updating password", error);
      return { success: false, message: "Error updating password" };
    }

  },
  getUrlFromFileUpload: async function (
    _fileRef: string,
    userId: string,
    randomId: string,
    file: File
  ) {
    // const fileRef = ref(
    //   storage,
    //   `${_fileRef}/${userId}_${randomId}_${new Date().getTime()}`
    // );

    // const snapshot = await uploadBytes(fileRef, file);
    let url_c: any
    // if (typeof window === 'undefined') {
    //   url_c = await cloudinary.v2.uploader.upload(file, { folder: '', resource_type: 'image', public_id: `${_fileRef}/${userId}_${randomId}_${new Date().getTime()}` })
    //   console.log(url_c)
    // }
    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', userId);
    formData.append('randomId', randomId);
    formData.append('_fileRef', _fileRef);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    console.log(data.url)

    // // const fileUrl = await getDownloadURL(snapshot.ref);

    return data.url;
  },
  uploadUserAvatar: async function (
    userId: string,
    randomId: string,
    file: any
  ) {


    const url = await this.getUrlFromFileUpload(
      'depositProof',
      userId,
      randomId,
      file
    );

    console.log(url);
    return url;
  },

    fetchMarkets: async () => {
      try {
        const marketsRef = doc(db, 'markets', 'id');
        const marketSnap = await getDoc(marketsRef)
  
        if(marketSnap.exists()) {
          console.log(marketSnap.data())
          return marketSnap.data().markets
        }
  
        return null
        
      } catch (error) {
        console.error("Error fetching wallet data:", error);
        
      }
    
    },
    updateMarkets: async (plans: any) => {
      try {
        const marketsRef = doc(db, 'markets', 'id');
        await setDoc(marketsRef, {
          markets: plans
        })

        return "succesfull"
        
      } catch (error) {
        console.error("Error fetching wallet data:", error);
        
      }
    
    },
  updateMarket: async (newMarket: {plan: string, id: string | number}) => {
    try {
      const marketsRef = doc(db, "markets", "id");

      await updateDoc(marketsRef, {
        markets: arrayUnion(newMarket) // Adds a new market without removing existing ones
      });

      return "successful";
    } catch (error) {
      console.error("Error updating markets:", error);
      throw error
    }
  },

  sendDepositRequest: async function (user: string, data: IDeposit, type: DepositUserType = "user") {
    console.log(data, user)
    const userRef = doc(db, 'users', user);
    const res = await getDoc(userRef);

    const deposits = res?.data()?.deposits;
    let imageId = generateUniqueCode(7);

    data.date = Timestamp.now();
    if(type !== "admin") {
    const url = await this.uploadUserAvatar(user, imageId, data.proofOfPayment);

    console.log(url);

    const _ = await addDoc(collection(db, 'depositRequests'), {
      ...data,
      proofOfPayment: url,
    });

    await updateDoc(userRef, {
      deposits: [
        ...deposits,
        {
          ...data,
          _id: _.id,
          proofOfPayment: url,
        },
      ],
    });
    return { message: 'Successful', ok: true, id: data?._id, url };
  }else {
    const _ = await addDoc(collection(db, 'depositRequests'), {
      ...data
    });

    await updateDoc(userRef, {
      deposits: [
        ...deposits,
        {
          ...data,
          _id: _.id,
        },
      ],
    });

    return { message: 'Successful', ok: true, id: data?._id };
  }
  },

  sendWithdrawalRequest: async function (user: string, data: IWITHDRAWAL) {
    const userRef = doc(db, 'users', user);
    const res = await getDoc(userRef);

    const withdrawals = res?.data()?.withdrawals ? res?.data()?.withdrawals : res?.data()?.widthdrawals;
    const withdrawalName = res?.data()?.withdrawals ? 'withdrawals' : 'widthdrawals'
    getDoc(userRef).then(async (snap) => {
      const body = snap.data();
      if (!body) return toast.error('user not found');

      const _ = await addDoc(collection(db, 'withdrawalRequests'), {
        ...data,
      });

      await updateDoc(userRef, {
        [withdrawalName]: [
          ...withdrawals,
          {
            ...data,
            _id: _.id,
          },
        ],
      });
    });
    return { message: 'Successful', ok: true, id: data?._id };
  },

  sendBotPurchase: async function (user: string, data: any) {
    const userRef = doc(db, 'users', user);
    const res = await getDoc(userRef);

    const plans = res?.data()?.plans;
    const wallet = res?.data()?.wallet;
    await updateDoc(userRef, {
      wallet: {...wallet, deposit: Number(wallet.deposit) - Number(data.min_amount)},
      plans: [
        ...plans,
        {
          ...data,
        },
      ],
    });
  },
  sendInvestmentPurchase: async function (user: string, data: any, amount:number) {
    const userRef = doc(db, 'users', user);
    const res = await getDoc(userRef);
    
    const investments = res?.data()?.investments;
    const wallet = res?.data()?.wallet;
    await updateDoc(userRef, {
      wallet: {...wallet, deposit: Number(wallet.deposit) - Number(amount)},
      investments: [
        ...investments,
        {
          ...data,
          amount,
          status: "active",
          date: Timestamp.now()

        },
      ],
    });
  },

  updateInvestmentPurchase: async function (user: string) {
    const userRef = doc(db, 'users', user);
    const res = await getDoc(userRef);
    
    const investments = res?.data()?.investments;
    investments.map((invs:InvestmentType) => {
      if(invs.status === "ongoing" && invs.date) {
        const timeStamp = invs.date.toDate()
        const expiryDate = new Date(timeStamp)
        expiryDate.setDate(expiryDate.getDate() + invs.duration)
        const currentDate = new Date()
        if(currentDate > expiryDate) {
          invs.status = "completed"
        }
      }
    })

    console.log(investments)
    await updateDoc(userRef, {
      investments: [
        ...investments,
      ],
    });
  }
};