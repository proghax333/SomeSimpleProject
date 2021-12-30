import React from 'react'
import { UserProvider } from './contexts/UserContext';
import { MainRouter } from './components/MainRouter';
import './styles/App.css';

function App() {
  return (
    <UserProvider>
      <MainRouter />
    </UserProvider>
  )
}

export default App
