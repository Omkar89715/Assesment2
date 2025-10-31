import React, { useState } from 'react'

export default function Login({ onLogin }){
  const [email, setEmail] = useState('')

  function submit(e){
    e.preventDefault()
    if(!email || !email.includes('@')) return alert('Please enter a valid email')
    
    const saved = localStorage.getItem('subs_' + email)
    const subscriptions = saved ? JSON.parse(saved) : []
    onLogin({ email, subscriptions })
  }

  return (
    <div className="center-page">
      <form className="card" onSubmit={submit}>
        <h2>Stock Broker Dashboard</h2>
        <p>Login with your email to continue</p>
        <input placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)} />
        <button type="submit">Login</button>
        <p style={{fontSize:12, color:'#666', marginTop:10}}>Supported stocks: GOOG, TSLA, AMZN, META, NVDA</p>
      </form>
    </div>
  )
}
