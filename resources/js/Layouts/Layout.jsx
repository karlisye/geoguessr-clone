import { Link, useForm, usePage } from '@inertiajs/react'
import React from 'react'

const Layout = ({children}) => {
    const { post } = useForm();
    const { user } = usePage().props.auth
  return (
    <>
        <header>
            <nav className='bg-slate-200 flex gap-5 py-2 px-20 font-bold items-center justify-between relative'>
                <div className='flex gap-5 items-center'>
                    <Link href='/'>Home</Link>
                    <Link href='/scores' className='py-2 px-6 hover:cursor-pointer rounded-xl bg-slate-300 hover:bg-slate-400'>Leaderboard</Link>
                </div>

 
                <div className='flex gap-5 items-center'>
                {user ? (
                    <>
                    <Link href='/play' className='absolute left-1/2 py-2 px-6 hover:cursor-pointer rounded-xl bg-slate-300 hover:bg-slate-400 transform -translate-x-1/2'>Play</Link>
                    <form onSubmit={ (e) => { e.preventDefault(); post('/logout') }}>
                        <button className='py-2 px-6 hover:cursor-pointer rounded-xl bg-slate-300 hover:bg-slate-400'>Log out</button>
                    </form>
                    </>
                ) : (
                    <>
                    <Link href='/login' className='py-2 px-6 hover:cursor-pointer rounded-xl bg-slate-300 hover:bg-slate-400'>Log in</Link>
                    <Link href='/register' className='py-2 px-6 hover:cursor-pointer rounded-xl bg-slate-300 hover:bg-slate-400'>Register</Link>
                    </>
                )}
                </div>
            </nav>
        </header>
        <main>
            {children}
        </main>
    </>
  )
}

export default Layout