import { useForm } from '@inertiajs/react'
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
    <div>
      <h2>Register page</h2>
      
      <form onSubmit={handleSubmit}>
        <input value={data.name} type="text" placeholder='name' onChange={(e) => setData('name', e.target.value)} />
        {errors.name && <p>{errors.name}</p>}

        <input value={data.email} type="text" placeholder='email' onChange={(e) => setData('email', e.target.value)} />
        {errors.email && <p>{errors.email}</p>}

        <input value={data.password} type="text" placeholder='password' onChange={(e) => setData('password', e.target.value)} />
        {errors.password && <p>{errors.password}</p>}

        <input value={data.password_confirmation} type="text" placeholder='confirm password' onChange={(e) => setData('password_confirmation', e.target.value)} />

        <button>Register</button>
      </form>
    </div>
  )
}

export default Register