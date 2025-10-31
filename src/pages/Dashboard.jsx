import React, { useEffect, useState, useRef } from 'react'
import { STOCKS, createPriceGenerator } from '../services/priceGenerator'

export default function Dashboard({ user, onLogout }){
  const [subscriptions, setSubscriptions] = useState(user.subscriptions || [])
  const [prices, setPrices] = useState(() => {
    const p = {}
    STOCKS.forEach(s => p[s] = 0)
    return p
  })
  const bcRef = useRef(null)
  const genRef = useRef(null)

  
  useEffect(()=>{
    const saved = localStorage.getItem('subs_' + user.email)
    if(saved) setSubscriptions(JSON.parse(saved))
  },[user.email])

  useEffect(()=>{
    const bc = new BroadcastChannel('stock_prices_channel')
    bcRef.current = bc
    bc.onmessage = (ev) => {
      const data = ev.data
      if(data && data.ticker){
        setPrices(prev=> ({...prev, [data.ticker]: data.price}))
      }
    }
    return ()=> { bc.close() }
  },[])

  
  useEffect(()=>{
    genRef.current = createPriceGenerator((update)=> {
      
      setPrices(prev=> ({...prev, [update.ticker]: update.price}))
      try { new BroadcastChannel('stock_prices_channel').postMessage(update) } catch(e){}
    })
    return ()=> genRef.current && genRef.current.stop()
  },[])

  
  useEffect(()=>{
    localStorage.setItem('subs_' + user.email, JSON.stringify(subscriptions))
    
    const savedUser = JSON.parse(localStorage.getItem('stock_user') || 'null')
    if(savedUser && savedUser.email === user.email){
      savedUser.subscriptions = subscriptions
      localStorage.setItem('stock_user', JSON.stringify(savedUser))
    }
  },[subscriptions, user.email])

  function toggle(ticker){
    setSubscriptions(s => {
      if(s.includes(ticker)) return s.filter(x=>x!==ticker)
      return [...s, ticker]
    })
  }

  return (
    <div>
      <header className="topbar">
        <div className="brand">EazyPayouts - Stocks</div>
        <div className="controls">
          <span style={{marginRight:12}}>{user.email}</span>
          <button className="btn" onClick={onLogout}>Logout</button>
        </div>
      </header>

      <main className="container">
        <aside className="leftnav">
          <div className="logo">Menu</div>
          <ul>
            <li className="active">Dashboard</li>
            <li>Subscriptions</li>
            <li>Settings</li>
          </ul>
        </aside>

        <section className="content">
          <h3>Subscribe to Stocks</h3>
          <div className="stocks-grid">
            {STOCKS.map(t => (
              <div key={t} className={'stock-card ' + (subscriptions.includes(t)?'subscribed':'')}>
                <div className="stock-top">
                  <div className="ticker">{t}</div>
                  <div className="price">₹ {prices[t].toLocaleString()}</div>
                </div>
                <button onClick={()=>toggle(t)}>{subscriptions.includes(t)?'Unsubscribe':'Subscribe'}</button>
              </div>
            ))}
          </div>

          <h3 style={{marginTop:18}}>Your Subscriptions</h3>
          <div className="subs-list">
            {subscriptions.length===0 ? <div>No subscriptions yet</div> : subscriptions.map(s=> (
              <div key={s} className="sub-row">
                <div><strong>{s}</strong></div>
                <div>Price: ₹ {prices[s].toLocaleString()}</div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
