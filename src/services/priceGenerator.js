export const STOCKS = ['GOOG','TSLA','AMZN','META','NVDA']


export function createPriceGenerator(onUpdate){
  
  const prices = {}
  STOCKS.forEach(s => prices[s] = Math.floor(Math.random()*200000) + 1000)

  let stopped = false
  const interval = setInterval(()=>{
    STOCKS.forEach(t => {
      
      const cur = prices[t]
      const change = Math.floor(cur * (Math.random()*0.04 - 0.02))
      const next = Math.max(1, cur + change)
      prices[t] = next
      const payload = { ticker: t, price: next, ts: Date.now() }
      try { onUpdate(payload) } catch(e){}
    })
  }, 1000)

  return {
    stop(){ clearInterval(interval); stopped = true },
    isStopped(){ return stopped }
  }
}
