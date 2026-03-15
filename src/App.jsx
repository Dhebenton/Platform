import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import Sidebar from './components/sidebar/Sidebar'
import './css/font.css'
import './App.css'
import './css/flex.css'
import Topbar from './components/topbar/Topbar'
import AnalyticsOverview from './components/screens/analytics/overview/components/AnalyticsOverview'


function App() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const access_token = params.get('access_token')
    const refresh_token = params.get('refresh_token')

    if (access_token && refresh_token) {
      supabase.auth.setSession({ access_token, refresh_token }).then(({ data }) => {
        setSession(data.session)
        setLoading(false)
        window.history.replaceState({}, '', '/')
      })
    } else {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
        setLoading(false)
      })
    }

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])
  

  useEffect(() => {
  if (loading || !session) return  // main isn't rendered yet

  const main = document.querySelector('main')
  if (!main) return

  const handleScroll = () => {
    const header = document.querySelector('header')
    if (!header) return
    header.classList.toggle('scrolled', main.scrollTop > 0)
  }

  main.addEventListener('scroll', handleScroll)
  return () => main.removeEventListener('scroll', handleScroll)
}, [loading, session])  // 👈 re-runs when these change

  return (
    <>
      <Sidebar />
      <main className='flex'>
          <Topbar />
          <AnalyticsOverview />
      </main>
    </>
  )
}

export default App