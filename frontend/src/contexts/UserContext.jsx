
import React from 'react';

export const UserContext = React.createContext();

export function UserProvider({ children, ...props }) {
  const [userDetails, setUserDetails] = React.useState(null);
  const [loaded, setLoaded] = React.useState(false);

  const login = (user) => {
    localStorage.setItem('credentials', 
    JSON.stringify(user));
    setUserDetails(user);
  }
  const logout = () => {
    localStorage.removeItem('credentials');
    setUserDetails(null);
  }

  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem('credentials'));
    setUserDetails(user);
    setLoaded(true);

    return () => {}
  }, []);

  const isLoggedIn = () => !!userDetails;

  const value = {
    userDetails,
    login,
    logout,
    isLoggedIn
  }

  return <UserContext.Provider {...props} value={value}>
    {loaded ? children : null}
  </UserContext.Provider>
}
