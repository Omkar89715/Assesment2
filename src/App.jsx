import React, { useEffect, useState } from 'react'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

const AUTH_KEY = 'stock_user'

export default function App(){
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem(AUTH_KEY)) } catch { return null }
  })

  useEffect(()=>{
    if(user) localStorage.setItem(AUTH_KEY, JSON.stringify(user))
    else localStorage.removeItem(AUTH_KEY)
  },[user])

  function handleLogout(){ setUser(null) }

  return user ? <Dashboard user={user} onLogout={handleLogout} /> : <Login onLogin={setUser} />
}
