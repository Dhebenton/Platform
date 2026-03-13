import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import Sidebar from './components/sidebar/Sidebar'
import './css/font.css'
import './App.css'
import './css/flex.css'


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

  if (loading) return null

  if (!session) {
    window.location.href = 'http://localhost:5174'
    return null
  }

  return (
    <>
      <Sidebar />
      <main></main>
    </>
  )
}

export default App