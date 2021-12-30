
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useForm } from '../../hooks/useForm';

export default function Login()
{
  const { register, onSubmit } = useForm();
  const { login } = useAuth();
  const history = useHistory();

  const handler = (formData) => {
    console.log(formData);
    login(formData);
    history.push('/posts/1');
  }

  return <div>
    <form onSubmit={onSubmit(handler)} style={{
      display: "flex",
      flexDirection: "column"
    }}>
      <input type="text" {...register("username")} />
      <input type="text" {...register("name")} />
      <button type="submit">Login</button>
    </form>
  </div>
}