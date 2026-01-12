import { Link, useForm, usePage } from '@inertiajs/react'
import React from 'react'

const Layout = ({ children }) => {
  const user = usePage().props.auth.user;
  const { post } = useForm();

  return (
    <>
      <header>
        <nav className='p-2 py-4 bg-slate-900 text-white shadow-lg flex gap-4 items-center text-xl font-extrabold px-4 italic'>
          <Link className='flex gap-1 items-center' href='/'>
            <img className='h-8' src="https://www.geoguessr.com/_next/static/media/logo-without-tm.0a5d1adf.svg" />
            <span className='not-italic text-red-500'>Clone</span>
          </Link>

          {user ? (
            <>
              <Link href='/play'>Play</Link>

              <form className='ml-auto' onSubmit={(e) => {e.preventDefault(); post('/logout')}}>
                <button>Log out</button>
              </form>
            </>
          ) : (
            <>
              <div className='ml-auto flex gap-2'>
                <Link href='/login'>Log in</Link>
                <Link href='/register'>Register</Link>
              </div>
            </>
          )}
        </nav>
      </header>

      <main className='h-screen bg-indigo-950 text-white'>
        {children}
      </main>
    </>
  )
}

export default Layout