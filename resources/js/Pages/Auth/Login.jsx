import { useForm } from '@inertiajs/react'
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
    <div>
      <h2>Login page</h2>
      
      <form onSubmit={handleSubmit}>
        <input value={data.email} type="text" placeholder='email' onChange={(e) => setData('email', e.target.value)} />
        {errors.email && <p>{errors.email}</p>}

        <input value={data.password} type="text" placeholder='password' onChange={(e) => setData('password', e.target.value)} />
        {errors.password && <p>{errors.password}</p>}

        <button>Login</button>
      </form>
    </div>
  )
}

export default Login