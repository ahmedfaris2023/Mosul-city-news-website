import React,{useEffect} from 'react'
import { useForm } from 'react-hook-form'
import MainLayout from '../../components/MainLayout'
import {Link,useNavigate} from "react-router-dom"
import {useMutation} from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { login } from '../../services/index/users'
import {useDispatch,useSelector} from 'react-redux'
import { userActions } from '../../store/reducers/userReducers'


const LoginPage = () => {
    const navigate=useNavigate()
    const dispatch=useDispatch();
    const userState=useSelector(state=>state.user)


    const {mutate,isLoading}=useMutation({
        mutationFn:({email,password})=>{
            return login({
                email,password
            })
        },
        onSuccess:(data)=>{
           dispatch(userActions.setUserInfo(data))
           localStorage.setItem("account",JSON.stringify(data))
        },
        onError:(error)=>{
            toast.error(error.message)
            console.log(error)
        }
    })

useEffect(()=>{
    if(userState.userInfo){
        navigate('/')
    }
},[navigate,userState.userInfo])

const {register,
    handleSubmit,
    formState:{errors,isValid},
    
}=useForm({
    defaultValues:{
    email:'',
    password:'',
    },
    mode:'onChange',
   
})

    const submitHandler=(data)=>{
         const {email,password}=data
        mutate({email,password})
    }

  



  return <MainLayout>
    <section className='container mx-auto px-5 py-10'>
        <div className='w-full max-w-sm mx-auto'>
            <h1 className='font-roboto text-2xl font-bold text-center text-dark-hard mb-8 font-sans'>تسجيل الدخول </h1>
            <form onSubmit={handleSubmit(submitHandler) }>
             
                  <div className='flex flex-col mb-6 w-full'>
                    <label htmlFor="email" className='text-[#5a7184] font-semibold block font-sans'>الحساب</label>
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
                     { errors.email?.message && (
                        <p className='text-red-500 text-xs mt-1'>{errors.email?.message}</p>
                    )}
                </div>
                  <div className='flex flex-col mb-6 w-full'>
                    <label htmlFor="password" className='text-[#5a7184] font-semibold block'>الرقم السري</label>
                    <input type="password" id='password' {...register('password',{
                        required:{
                            value:true,
                            message:"كلمة المرور مطلوبة"
                        },
                        minLength:{
                            value:6,
                            message:"يجب أن يكون طول كلمة المرور 6 أحرف على الأقل"
                        }
                    })}  placeholder='أدخل كلمة المرور' className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border
                     ${errors.password?"border-red-500" :"border-[#c3cad9]"}`}/>
                 {errors.password?.message && (
                        <p className='text-red-500 text-xs mt-1'>{errors.password?.message}</p>
                    )}
                </div>
                 
              
                <button type='submit' disabled={!isValid ||isLoading} className='font-sans bg-primary text-white font-bold text-bold text-lg py-4 px-8 w-full rounded-lg my-6 disabled:opacity-70 disabled:cursor-not-allowed'>
                تسجيل الدخول</button>
                <p className=' font-sans text-sm font-semibold text-[#5a7184]'>
                    لا تملك حساب؟ <Link to='/register' className='font-sans text-primary'>سجل الان</Link>

                </p>
            </form>
        </div>
    </section>
  </MainLayout>
}

export default LoginPage