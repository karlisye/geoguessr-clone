import { Link, useForm, usePage } from '@inertiajs/react'
import React from 'react'

const Layout = ({ children }) => {
  const user = usePage().props.auth.user;
  const { post } = useForm();

  return (
    <>
      <header>
        <nav className='p-2 bg-slate-100 shadow-lg flex gap-2'>
          <Link href='/'>Home</Link>

          {user ? (
            <>
              <form onSubmit={(e) => {e.preventDefault(); post('/logout')}}>
                <button>Log out</button>
              </form>

              <Link href='/play'>Play</Link>
            </>
          ) : (
            <>
              <Link href='/login'>Log in</Link>
              <Link href='/register'>Register</Link>
            </>
          )}
        </nav>
      </header>

      <main>
        {children}
      </main>
    </>
  )
}

export default Layout