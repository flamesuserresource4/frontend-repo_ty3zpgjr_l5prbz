import { useState } from 'react'
import Landing from './components/Landing'
import Auth from './components/Auth'
import Dashboard from './components/Dashboard'

function App() {
  const [screen, setScreen] = useState('landing')
  const [authChoice, setAuthChoice] = useState({ role: 'member', mode: 'login' })

  const handleChooseAuth = (role, mode) => {
    setAuthChoice({ role, mode })
    setScreen('auth')
  }

  const handleAuthed = () => {
    setScreen('dashboard')
  }

  return (
    <>
      {screen === 'landing' && <Landing onChooseAuth={handleChooseAuth} />}
      {screen === 'auth' && (
        <Auth role={authChoice.role} mode={authChoice.mode} onAuthed={handleAuthed} onBack={()=>setScreen('landing')} />
      )}
      {screen === 'dashboard' && <Dashboard />}
    </>
  )
}

export default App
