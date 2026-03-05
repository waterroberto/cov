"use client"
import { useEffect, useState } from "react";
import { getAuth, confirmPasswordReset, updatePassword } from "firebase/auth";
import { app } from "@/config/firebase.config";
import Button from "@/components/Global/Button";
import TextInput from "@/components/Global/TextInput";
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "lucide-react";
import Card from "@/components/Global/Card";
import * as Yup from 'yup';
import { useFormik } from "formik";
import { BiShowAlt, BiSolidHide } from "react-icons/bi";
import { useRouter } from 'next/navigation';
import { UserService } from "@/services/user";
import toast from "react-hot-toast";
import Logo from "@/components/Global/Logo";

export default function NewPassword() {
  const router = useRouter();
  const [oldPassword, setOldPassword] = useState(false);
  const [newPassword, setNewPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId")
    if(!userId){
      router.replace('/auth/reset-password')
    }
  }, [router])

  const formik = useFormik({
    initialValues: {
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      newPassword: Yup.string().min(6).required(),
      confirmPassword: Yup.string().oneOf([Yup.ref("newPassword"), undefined], "Passwords must match").min(6).required(),
    }),
    onSubmit(values) {
      console.log(values);

      handleResetPassword(values);
    },
  });



  console.log(process.env.NEXT_FIREBASE_ADMIN_SDK)


  const handleResetPassword = async (values:any) => {
    setIsLoading(true)
    try {

      const userId = localStorage.getItem('userId')
      if(!userId) {
        toast.error("user ID not found")
        return router.replace('/auth/reset-password')
        setIsLoading(false)
      }
      console.log(userId)
      await UserService.updateUserPassword({userId, newPassword:values.newPassword })
      toast.success("Your password has been successfully reset! ")
      setIsLoading(false)
      router.replace('/auth/login')
    } catch (error) {
      toast.error("server error! please try again.")
      console.log(error);
      setIsLoading(false)
    }
  };

  const { handleChange, handleSubmit, values, errors } = formik;
  console.log(errors)
  return (
    <div className="py-9  w-full bg-primary relative  gap-8 p-4 items-center justify-center flex flex-col sm:px-8 lg:px-16 xl:px-32 h-dvh">
      <Link href='/' className=' my-5'>
        <Logo width={150} height={150} />
      </Link>
      <div className="max-w-[500px]  w-full p-4  items-center">
        <div className='flex items-center gap-4 p-3 w-full'>
          {/* <Link href={``} onClick={() => router.back()} className=''>
            <FiArrowLeft fontSize={30} className='text-gray-50' />
          </Link> */}
          <div className='flex flex-col items-start gap-1 text-white'>
            <h3 className='text-xl font-bold-extra text-center self-center'>Reset Your Password{' '}</h3>
            {/* <p className='text-xs capitalize text-white'>
              change your password{' '}
            </p> */}
          </div>
        </div>
        {/* form */}
        <form onSubmit={handleSubmit} className=' p-3 flex flex-col gap-5 w-full'>
          <div className='flex flex-col gap-3'>
            <label className=" text-gray-50" htmlFor='newPassword'>New Password</label>
            <TextInput
              type={newPassword ? 'text' : 'password'}
              name='newPassword'
              id='newPassword'
              rightIcon={newPassword ? <BiShowAlt color="#fff" /> : <BiSolidHide color="#fff" />}
              rightIconClick={() => setNewPassword(!newPassword)}
              value={values.newPassword}
              onChange={handleChange}
              dark
            />
          <p className="text-red-700 text-sm font-bold">{errors.newPassword}</p>
          </div>

          <div className='flex flex-col gap-3'>
            <label className=" text-gray-50" htmlFor='confirmPassword'>Confirm Password</label>
            <TextInput
              type={confirmPassword ? 'text' : 'password'}
              name='confirmPassword'
              id='confirmPassword'
              rightIcon={confirmPassword ? <BiShowAlt color="#fff" /> : <BiSolidHide color="#fff" />}
              rightIconClick={() => setConfirmPassword(!confirmPassword)}
              value={values.confirmPassword}
              onChange={handleChange}
              dark
            />
          <p className="text-red-700 text-sm font-bold">{errors.confirmPassword}</p>
          </div>

          <Button loading={isLoading} color="primary_2" block type='submit'>
            {isLoading ? 'Loading...' : 'Change Password'}
            
          </Button>
        </form>

      </div>
    </div>
  );
}
