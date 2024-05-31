import React,{useEffect} from 'react'
import { useForm } from 'react-hook-form'
import MainLayout from '../../components/MainLayout'
import {useNavigate} from "react-router-dom"
import { useMutation, useQuery,useQueryClient } from '@tanstack/react-query'
import { toast } from "react-hot-toast";
import {useDispatch,useSelector} from 'react-redux'
import {getUserProfile,updateProfile} from '../../services/index/users'
import ProfilePicture from '../../components/ProfilePicture'
import { userActions } from '../../store/reducers/userReducers'
import { useMemo } from "react";
const ProfilePage = () => {
    const navigate=useNavigate()
    const dispatch=useDispatch();
    const userState=useSelector(state=>state.user)
    const queryClient=useQueryClient()
     const { data: profileData, isLoading: profileIsLoading } = useQuery({
        queryFn:()=>{
            return getUserProfile({token:userState.userInfo.token})
        },
        queryKey:['profile']
    })


    const {mutate,isLoading:updateProfileIsLoading}=useMutation({
        mutationFn:({name,email,password})=>{
            return updateProfile({
                token:userState.userInfo.token,
                userData:{
                    name,email,password
                },
                userId: userState.userInfo._id,
            })
        },
        onSuccess:(data)=>{
           dispatch(userActions.setUserInfo(data))
           localStorage.setItem("account",JSON.stringify(data))
           queryClient.invalidateQueries(['profile'])
           toast.success("Profile is updated")
        },
        onError:(error)=>{
            toast.error(error.message)
            console.log(error)
        }
    })

 
useEffect(()=>{
    if(!userState.userInfo){
        navigate('/')
    }
},[navigate,userState.userInfo])

const {register,
    handleSubmit,
    formState:{errors,isValid},
}=useForm({
    defaultValues:{
    name:"",
    email:'',
    password:'',
    },
    values: useMemo(() => {
      return {
        name: profileIsLoading ? "" : profileData.name,
        email: profileIsLoading ? "" : profileData.email,
      };
    }, [profileData?.email, profileData?.name, profileIsLoading]),
    mode:'onChange',
   
})

    const submitHandler=(data)=>{
        const {name,email,password}=data
        mutate({name,email,password})
    }

    console.log(profileData)



  return <MainLayout>
    <section className=' container mx-auto px-5 py-10'>
        <div className='w-full max-w-sm mx-auto'>
     
         <ProfilePicture avatar={profileData?.avatar}/>
            <form onSubmit={handleSubmit(submitHandler) }>
                <div className='flex flex-col mb-6 w-full'>
                    <label htmlFor="name" className=' font-sans text-[#5a7184] font-semibold block'>الاسم</label>
                    <input type="text" id='name' 
                    {...register('name',{
                        minLength:{
                            value:1,
                            massage:"يجب أن يكون طول الاسم حرفًا واحدًا على الأقل"
                        },
                        required:{
                            value:true,
                            message:"مطلوب الاسم",
                        }
                    })} 
                    placeholder='أدخل الاسم' 
                    className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${
                  errors.name ? "border-red-500" : "border-[#c3cad9]"}`}
                     />
                 {errors.name?.message && (
                        <p className='text-red-500 text-xs mt-1'>{errors.name?.message}</p>
                    )}
                </div>
                  <div className='flex flex-col mb-6 w-full'>
                    <label htmlFor="email" className='font-sans text-[#5a7184] font-semibold block'>الحساب</label>
                    <input type="email" id='email'{...register('email',{
                        pattern:{
                            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            massage:"أدخل بريد إلكتروني المتاح"
                        },
                        required:{
                            value:true,
                            message:"البريد الالكتروني مطلوب",
                        },
                    })}  placeholder='أدخل البريد الإلكتروني'  
                    
                    className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border
                     ${errors.email?"border-red-500" :"border-[#c3cad9]"}`}/>
                     {errors.email?.message && (
                        <p className='text-red-500 text-xs mt-1'>{errors.email?.message}</p>
                    )}
                </div>
                  <div className='flex flex-col mb-6 w-full'>
                    <label htmlFor="password" className='font-sans text-[#5a7184] font-semibold block'>كلمة المرور الجديدة  (اختياري)</label>
                    <input type="password" id='password' {...register('password')}  placeholder='ادخل كلمة المرور الجديدة ' className={`placeholder:text-[#959ead] font-sans text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border
                     ${errors.password?"border-red-500" :"border-[#c3cad9]"}`}/>
                 {errors.password?.message && (
                        <p className='text-red-500 text-xs mt-1'>{errors.password?.message}</p>
                    )}
                </div>
               
               
                <button type='submit' disabled={!isValid || profileIsLoading  || updateProfileIsLoading} className='font-sans bg-primary text-white font-bold text-bold text-lg py-4 px-8 w-full rounded-lg mb-6 disabled:opacity-70 disabled:cursor-not-allowed'>تحديث</button>
              
            </form>
        </div>
    </section>
  </MainLayout>
}

export default ProfilePage