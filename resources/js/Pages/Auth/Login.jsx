import { Link, useForm } from '@inertiajs/react'
import React from 'react'

const Login = () => {
    const { data, setData, post, errors } = useForm({
        email: '',
        password: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post('/login');
    }

    return (
        <>

            <div className='flex flex-col mx-auto w-80 gap-3 border border-gray-100 rounded-xl p-4 m-8 bg-white'>
                <h1 className='text-2xl font-bold text-center m-4'>Login form</h1>
                <form className='flex flex-col mx-auto w-full gap-3' onSubmit={handleSubmit}>
                    <input className='py-2 px-6 rounded-xl bg-slate-100 hover:bg-slate-200' value={data.email} type="text" placeholder='email' onChange={(e) => setData('email', e.target.value)}/>
                    {errors.email && <p className='text-red-400 font-semibold text-sm'>{errors.email}</p>}
                    <input className='py-2 px-6 rounded-xl bg-slate-100 hover:bg-slate-200' value={data.password} type="password" placeholder='password' onChange={(e) => setData('password', e.target.value)}/>
                    {errors.password && <p className='text-red-400 font-semibold text-sm'>{errors.password}</p>}
                    <div className='flex justify-center'>
                        <button className='py-2 px-6 hover:cursor-pointer rounded-xl bg-slate-100 hover:bg-slate-200'>Log in</button>
                    </div>
                </form>
                <div className='flex justify-between flex-col'>
                    <p className='text-sm text-gray-400'>Don't have an account?</p>
                    <Link href='/register' className='hover:cursor-pointer text-blue-500 font-semibold'>Register instead!</Link>
                </div>
            </div>
        </>
    )
}

export default Login