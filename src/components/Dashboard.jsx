import { useEffect, useState } from 'react'
import { TrendingUp, Shield, CreditCard, CheckCircle, XCircle } from 'lucide-react'

const API = import.meta.env.VITE_BACKEND_URL || ''

function useAuth(){
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  return { token, user }
}

export default function Dashboard(){
  const { token, user } = useAuth()
  const [overview, setOverview] = useState(null)
  const [deposits, setDeposits] = useState([])
  const [amount, setAmount] = useState('')
  const [loans, setLoans] = useState([])
  const [pendingLoans, setPendingLoans] = useState([])
  const [activeLoans, setActiveLoans] = useState([])

  const authHeader = { Authorization: `Bearer ${token}` }

  useEffect(()=>{
    fetch(`${API}/dashboard/overview`, { headers: authHeader }).then(r=>r.json()).then(setOverview)
    fetch(`${API}/deposits`, { headers: authHeader }).then(r=>r.json()).then(setDeposits)
    fetch(`${API}/loans`, { headers: authHeader }).then(r=>r.json()).then(setLoans)
    if(user.role === 'admin'){
      fetch(`${API}/loans/admin/pending`, { headers: authHeader }).then(r=>r.json()).then(setPendingLoans)
      fetch(`${API}/loans/admin/active`, { headers: authHeader }).then(r=>r.json()).then(setActiveLoans)
    }
  }, [])

  const uploadDeposit = async (e) => {
    e.preventDefault()
    const fd = new FormData()
    fd.append('amount', amount)
    const res = await fetch(`${API}/deposits/upload`, { method: 'POST', headers: authHeader, body: fd })
    if(res.ok){
      const data = await res.json()
      setAmount('')
      fetch(`${API}/deposits`, { headers: authHeader }).then(r=>r.json()).then(setDeposits)
    }
  }

  const applyLoan = async () => {
    const res = await fetch(`${API}/loans/apply`, { method: 'POST', headers: { 'Content-Type':'application/json', ...authHeader }, body: JSON.stringify({ amount: Number(amount) }) })
    if(res.ok){
      fetch(`${API}/loans`, { headers: authHeader }).then(r=>r.json()).then(setLoans)
    }
  }

  const decideLoan = async (id, decision) => {
    await fetch(`${API}/loans/${id}/decision?decision=${decision}`, { method: 'POST', headers: authHeader })
    fetch(`${API}/loans/admin/pending`, { headers: authHeader }).then(r=>r.json()).then(setPendingLoans)
    fetch(`${API}/loans/admin/active`, { headers: authHeader }).then(r=>r.json()).then(setActiveLoans)
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold">Welcome, {user.full_name}</h1>
          <p className="text-slate-400">Role: {user.role}</p>
        </header>

        <section className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-800/60 border border-slate-700 rounded p-4"><TrendingUp className="w-4 h-4"/> Balance <div className="text-2xl">{overview?.total_balance ?? '—'}</div></div>
          <div className="bg-slate-800/60 border border-slate-700 rounded p-4">Savings <div className="text-2xl">{overview?.total_savings ?? '—'}</div></div>
          <div className="bg-slate-800/60 border border-slate-700 rounded p-4">Active Loans <div className="text-2xl">{overview?.active_loans ?? '—'}</div></div>
          <div className="bg-slate-800/60 border border-slate-700 rounded p-4">Annual Cash-out <div className="text-2xl">{overview?.annual_cash_out ?? '—'}</div></div>
        </section>

        <section className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-800/60 border border-slate-700 rounded p-4">
            <h2 className="font-semibold mb-3">Deposits</h2>
            <form onSubmit={uploadDeposit} className="flex gap-2 mb-3">
              <input value={amount} onChange={e=>setAmount(e.target.value)} placeholder="Amount" className="flex-1 px-3 py-2 bg-slate-900/50 border border-slate-700 rounded" />
              <button className="bg-blue-600 rounded px-4">Upload</button>
            </form>
            <ul className="space-y-2">
              {deposits.map((d)=> (
                <li key={d._id} className="flex items-center justify-between bg-slate-900/40 border border-slate-700 rounded p-2">
                  <span>{d.amount} • {d.status}</span>
                  {user.role==='admin' && (
                    <div className="flex gap-2">
                      <button onClick={()=>decideLoan(d._id,'approved')} className="text-emerald-400 flex items-center gap-1"><CheckCircle className="w-4 h-4"/>Approve</button>
                      <button onClick={()=>decideLoan(d._id,'rejected')} className="text-red-400 flex items-center gap-1"><XCircle className="w-4 h-4"/>Reject</button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-800/60 border border-slate-700 rounded p-4">
            <h2 className="font-semibold mb-3">Loans</h2>
            <div className="flex gap-2 mb-3">
              <input value={amount} onChange={e=>setAmount(e.target.value)} placeholder="Amount" className="flex-1 px-3 py-2 bg-slate-900/50 border border-slate-700 rounded" />
              <button onClick={applyLoan} className="bg-emerald-600 rounded px-4">Apply</button>
            </div>
            <ul className="space-y-2">
              {loans.map((l)=> (
                <li key={l._id} className="bg-slate-900/40 border border-slate-700 rounded p-2">{l.amount} • {l.status}</li>
              ))}
            </ul>

            {user.role==='admin' && (
              <div className="mt-6">
                <h3 className="font-semibold">Pending approvals</h3>
                <ul className="space-y-2">
                  {pendingLoans.map((l)=> (
                    <li key={l._id} className="flex items-center justify-between bg-slate-900/40 border border-slate-700 rounded p-2">
                      <span>{l.amount} • {l.status}</span>
                      <div className="flex gap-2">
                        <button onClick={()=>decideLoan(l._id,'approved')} className="text-emerald-400 flex items-center gap-1"><CheckCircle className="w-4 h-4"/>Approve</button>
                        <button onClick={()=>decideLoan(l._id,'rejected')} className="text-red-400 flex items-center gap-1"><XCircle className="w-4 h-4"/>Reject</button>
                      </div>
                    </li>
                  ))}
                </ul>

                <h3 className="font-semibold mt-4">Active loans</h3>
                <ul className="space-y-2">
                  {activeLoans.map((l)=> (
                    <li key={l._id} className="bg-slate-900/40 border border-slate-700 rounded p-2">{l.amount} • approved</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
