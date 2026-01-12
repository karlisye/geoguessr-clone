import { Link, useForm } from '@inertiajs/react'
import React from 'react'

const Login = () => {
  const { data, errors, post, setData } = useForm({
    email:'',
    password:''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    post('/login');
  }

  return (
    <div className='h-screen bg-linear-to-br from-sky-900 to-indigo-950 flex justify-center items-center'> 
      <div className='absolute top-0 left-0 font-extrabold p-4 bg-slate-950 rounded-br-2xl'>
        <Link className='flex gap-1 items-center' href='/'>
          <img className='h-8' src="https://www.geoguessr.com/_next/static/media/logo-without-tm.0a5d1adf.svg" />
          <span className='not-italic text-red-500'>Clone</span>
        </Link>
      </div>

      <form onSubmit={handleSubmit} className='w-80 flex flex-col gap-4'>
        <div className='flex flex-col text-white font-bold gap-0.5'>
          <label className='italic text-sm' htmlFor="email">Email</label>
          <input className='bg-indigo-950 p-2 rounded-md' value={data.email} type="text" id='email' onChange={(e) => setData('email', e.target.value)} />
          {errors.email && <p className='text-red-500'>{errors.email}</p>}
        </div>

        <div className='flex flex-col text-white font-bold gap-0.5'>
          <label className='italic text-sm' htmlFor="password">Password</label>
          <input className='bg-indigo-950 p-2 rounded-md' value={data.password} type="text" id='password' onChange={(e) => setData('password', e.target.value)} />
          {errors.password && <p className='text-red-500'>{errors.password}</p>}
        </div>

        <div className='flex justify-between items-center'>
          <Link href='/register' className='text-slate-400 underline text-sm'>Create an account</Link>
          <button className='text-white font-bold bg-linear-to-b from-green-500 to-green-800 py-2 px-6 rounded-full italic hover:cursor-pointer hover:scale-105'>Log in</button>
        </div>
      </form>
    </div>
  )
}

Login.layout = page => page;

export default Login