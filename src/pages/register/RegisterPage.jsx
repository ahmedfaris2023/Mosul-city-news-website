import React,{useEffect} from 'react'
import { useForm } from 'react-hook-form'
import MainLayout from '../../components/MainLayout'
import {Link,useNavigate} from "react-router-dom"
import {useMutation} from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { signup } from '../../services/index/users'
import {useDispatch,useSelector} from 'react-redux'
import { userActions } from '../../store/reducers/userReducers'


const RegisterPage = () => {
    const navigate=useNavigate()
    const dispatch=useDispatch();
    const userState=useSelector(state=>state.user)


    const {mutate,isLoading}=useMutation({
        mutationFn:({name,email,password})=>{
            return signup({
                name,email,password
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
    watch,
}=useForm({
    defaultValues:{
    name:"",
    email:'',
    password:'',
    confirmPassword:'',
    checkbox:'',
    },
    mode:'onChange',
   
})

    const submitHandler=(data)=>{
         const {name,email,password}=data
        mutate({name,email,password})
    }

    const password=watch('password');



  return <MainLayout>
    <section className='container mx-auto px-5 py-10'>
        <div className='w-full max-w-sm mx-auto'>
            <h1 className='font-roboto text-2xl font-bold text-center text-dark-hard mb-8 font-sans'>تسجيل حساب</h1>
            <form onSubmit={handleSubmit(submitHandler) }>
                <div className='flex flex-col mb-6 w-full'>
                    <label htmlFor="name" className='text-[#5a7184] font-semibold block font-sans'>الاسم</label>
                    <input type="text" id='name' 
                    {...register('name',{
                        minLength:{
                            value:1,
                            massage:"يجب أن يكون طول الاسم حرفًا واحدًا على الأقل"
                        },
                        required:{
                            value:true,
                            message:"مطلوب اسم",
                        }
                    })} 
                    placeholder='أدخل الاسم' 
                    className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border font-sans
                     ${errors.name?"border-red-500" :"border-[#c3cad9]"}`}
                     />
                 {errors.name?.message && (
                        <p className='text-red-500 text-xs mt-1'>{errors.name?.message}</p>
                    )}
                </div>
                  <div className='flex flex-col mb-6 w-full'>
                    <label htmlFor="email" className='text-[#5a7184] font-semibold block font-sans'>البريد الالكتروني</label>
                    <input type="email" id='email'{...register('email',{
                        pattern:{
                            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            massage:"أدخل بريد إلكتروني متاح"
                        },
                        required:{
                            value:true,
                            message:"البريد الالكتروني مطلوب",
                        },
                    })}  placeholder='أدخل البريد الإلكتروني'  
                    
                    className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border font-sans
                     ${errors.email?"border-red-500" :"border-[#c3cad9]"}`}/>
                     {errors.email?.message && (
                        <p className='text-red-500 text-xs mt-1'>{errors.email?.message}</p>
                    )}
                </div>
                  <div className='flex flex-col mb-6 w-full'>
                    <label htmlFor="password" className='text-[#5a7184] font-semibold block font-sans'>كلمة المرور</label>
                    <input type="password" id='password' {...register('password',{
                        required:{
                            value:true,
                            message:"كلمة المرور مطلوبة"
                        },
                        minLength:{
                            value:6,
                            message:"يجب أن يكون طول كلمة المرور 6 أحرف على الأقل"
                        }
                    })}  placeholder='أدخل كلمة المرور' className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border font-sans
                     ${errors.password?"border-red-500" :"border-[#c3cad9]"}`}/>
                 {errors.password?.message && (
                        <p className='text-red-500 text-xs mt-1'>{errors.password?.message}</p>
                    )}
                </div>
                  <div className='flex flex-col mb-6 w-full'>
                    <label htmlFor="confirmPassword" className='text-[#5a7184] font-semibold block font-sans'>تأكيد كلمة المرور</label>
                    <input type="password" id='confirmPassword' {...register('confirmPassword',{
                        required:{
                            value:true,
                            message:"تأكيد كلمة المرور مطلوب"
                        },
                        validate:(value)=>{
                            if(value !==password){
                                return "كلمة المرور غير مطابقة"
                            }
                        }
                    })}  placeholder='أدخل تأكيد كلمة المرور' className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border font-sans
                     ${errors.confirmPassword?"border-red-500" :"border-[#c3cad9]"}`}/>
                 {errors.confirmPassword?.message && (
                        <p className='text-red-500 text-xs mt-1'>{errors.confirmPassword?.message}</p>
                    )}
                </div>
               
      <div className='flex flex-col mb-6 w-full'>
                    <label htmlFor="check" className='text-[#5a7184] font-semibold block font-sans'>العمر اكبر من 16 سنة</label>
                    <input type="checkbox" id='check' {...register('checkbox',{
                        required:{
                            value:true,
                            message:"تاكيد العمر اكبر من 16 سنة "
                        },
                
                    })}  placeholder='يجب الضغط على اختيار العمر اكبر من 16' className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border font-sans absolute bottom--1 left-[100px] right-20 
                     ${errors.confirmPassword?"border-red-500" :"border-[#c3cad9]"}`}/>
                 {errors.confirmPassword?.message && (
                        <p className='text-red-500 text-xs mt-1'>{errors.confirmPassword?.message}</p>
                    )}
                </div>

                <button type='submit' disabled={!isValid ||isLoading} className='bg-primary text-white font-bold text-bold text-lg py-4 px-8 w-full rounded-lg mb-6 disabled:opacity-70 disabled:cursor-not-allowed font-sans'>سجل</button>
                <p className='text-sm font-semibold text-[#5a7184] font-sans'>
                    لديك حساب؟ <Link to='/login' className='text-primary font-sans'>تسجيل الدخول الآن</Link>

                </p>
            </form>
        </div>
    </section>
  </MainLayout>
}

export default RegisterPage