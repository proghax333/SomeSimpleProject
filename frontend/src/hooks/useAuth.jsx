
import React from 'react';
import { UserContext } from '../contexts/UserContext';

export function useAuth() {
  const data = React.useContext(UserContext);
  return data;
}