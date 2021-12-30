
import React from 'react';
import { useAuth } from '../../hooks/useAuth';

export default function SafeRoute({
  children
}) {
  const { isLoggedIn, userDetails } = useAuth();
  console.log(isLoggedIn(), userDetails)

  return isLoggedIn() ? children : <div>
    <p>You are not logged in!</p>
    <Link to={"/login"}>Login</Link>
  </div>
}
