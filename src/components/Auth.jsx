import { useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || ''

export default function Auth({ role, mode, onAuthed, onBack }){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch(`${API}/auth/${mode}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mode === 'signup' ? { full_name: fullName, email, password, role } : { email, password })
      })
      const data = await res.json()
      if(!res.ok) throw new Error(data.detail || 'Request failed')
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data))
      onAuthed(data)
    } catch (err){
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-slate-800/60 border border-slate-700 rounded-xl p-6">
        <button onClick={onBack} className="text-slate-300 mb-4">← Back</button>
        <h2 className="text-xl font-semibold mb-1">{mode === 'signup' ? 'Create account' : 'Log in'} ({role})</h2>
        {mode==='signup' && (
          <input value={fullName} onChange={e=>setFullName(e.target.value)} placeholder="Full name" className="w-full mb-2 px-3 py-2 bg-slate-900/50 border border-slate-700 rounded" />
        )}
        <form onSubmit={submit} className="space-y-2">
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" type="email" className="w-full px-3 py-2 bg-slate-900/50 border border-slate-700 rounded" />
          <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" className="w-full px-3 py-2 bg-slate-900/50 border border-slate-700 rounded" />
          {error && <div className="text-red-400 text-sm">{error}</div>}
          <button disabled={loading} className="w-full bg-blue-600 hover:bg-blue-500 transition rounded px-4 py-2">{loading? 'Please wait...' : (mode==='signup' ? 'Sign up' : 'Log in')}</button>
        </form>
      </div>
    </div>
  )
}
