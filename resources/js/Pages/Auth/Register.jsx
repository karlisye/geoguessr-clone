import { Link, useForm } from '@inertiajs/react'
import React from 'react'

const Register = () => {
  const { data, errors, post, setData } = useForm({
    name:'',
    email:'',
    password:'',
    password_confirmation:''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    post('/register');
  }

  return (
    <div className='h-screen bg-linear-to-br from-sky-900 to-indigo-950 flex justify-center items-center'> 
      <div className='absolute top-0 left-0 font-extrabold p-4 bg-slate-950 rounded-br-2xl'>
        <Link className='flex gap-1 items-center' href='/'>
          <img className='h-8' src="https://www.geoguessr.com/_next/static/media/logo-without-tm.0a5d1adf.svg" />
          <span className='not-italic text-red-500'>Clone</span>
        </Link>
      </div>
      <div className='bg-slate-950 text-white py-8 px-14 rounded-xl w-100 shadow-2xl relative'>
        <Link href='/' className='text-center absolute top-0 right-0 m-4 rounded-full w-7 h-7 border font-extrabold'>
          X
        </Link>

        <div className='flex flex-col items-center mb-4'>
          <span className='font-extrabold italic text-2xl'>Almost There!</span>
          <span className='text-lg font-bold text-yellow-500 text-center italic'>Just a few more steps and you're ready to go!</span>
        </div>

        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <div className='flex flex-col text-white font-bold gap-0.5'>
            <label className='italic text-sm' htmlFor="name">Name</label>
            <input className='bg-indigo-950 p-2 rounded-md' value={data.name} type="text" id='name' onChange={(e) => setData('name', e.target.value)} />
            {errors.name && <p className='text-red-500'>{errors.name}</p>}
          </div>

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

          <div className='flex flex-col text-white font-bold gap-0.5'>
            <label className='italic text-sm' htmlFor="confirm_password">Confirm password</label>
            <input className='bg-indigo-950 p-2 rounded-md' value={data.password_confirmation} type="text" id='confirm_password' onChange={(e) => setData('password_confirmation', e.target.value)} />
          </div>

          <div className='flex justify-center'>
            <button className='text-white font-bold bg-linear-to-b from-green-500 to-green-800 py-2 px-6 rounded-full italic hover:cursor-pointer hover:scale-105'>Sign up</button>
          </div>
        </form>
      </div>
    </div>
  )
}

Register.layout = page => page;


export default Register