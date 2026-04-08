import { useEffect, useState } from 'react'
import { getDashboard, getTodayBriefing } from '../services/api'

interface DashboardData {
  lifex_score: number
  trading: Record<string, any>
  budget: Record<string, any>
  alerts: Array<{ type: string; message: string; severity: string }>
}

const MODULE_LINKS = [
  { name: 'STAAX', url: 'https://staax.lifexos.co.in', live: true },
  { name: 'INVEX', url: 'https://invex.lifexos.co.in', live: true },
  { name: 'BUDGEX', url: 'https://budgex.lifexos.co.in', live: true },
  { name: 'FINEX', url: null, live: true, here: true },
  { name: 'NETEX', url: null, live: false },
  { name: 'GOALEX', url: null, live: false },
]

const cardStyle: React.CSSProperties = {
  background: 'rgba(22,22,28,0.72)',
  border: '1px solid rgba(245,158,11,0.18)',
  borderRadius: 12,
  padding: '18px 20px',
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [briefing, setBriefing] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([getDashboard(), getTodayBriefing()])
      .then(([d, b]) => { setData(d); setBriefing(b.briefing || '') })
      .catch(() => setBriefing('Good morning, Karthikeyan. Your LIFEX systems are running.'))
      .finally(() => setLoading(false))
  }, [])

  const score = data?.lifex_score ?? 72
  const trading = data?.trading ?? {}
  const budget = data?.budget ?? {}
  const alerts = data?.alerts ?? []

  return (
    <div>
      <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 22, fontWeight: 700, color: '#F59E0B', marginBottom: 24 }}>
        Good morning, Karthikeyan
      </h1>

      {/* Summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {/* LIFEX Score */}
        <div style={{ ...cardStyle, borderLeft: '3px solid #F59E0B' }}>
          <div style={{ fontSize: 11, color: 'rgba(232,232,248,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>LIFEX Score</div>
          <div style={{ fontSize: 32, fontWeight: 800, fontFamily: 'Syne, sans-serif', color: '#F59E0B' }}>{score}<span style={{ fontSize: 16, color: 'rgba(232,232,248,0.4)' }}>/100</span></div>
          <div style={{ fontSize: 12, color: 'rgba(232,232,248,0.4)', marginTop: 4 }}>Financial health index</div>
        </div>
        {/* Net Worth */}
        <div style={{ ...cardStyle, borderLeft: '3px solid #22DD88' }}>
          <div style={{ fontSize: 11, color: 'rgba(232,232,248,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>Net Worth</div>
          <div style={{ fontSize: 28, fontWeight: 800, fontFamily: 'Syne, sans-serif', color: '#22DD88' }}>₹1.32Cr</div>
          <div style={{ fontSize: 12, color: 'rgba(232,232,248,0.4)', marginTop: 4 }}>+38.4% from genesis</div>
        </div>
        {/* Trading */}
        <div style={{ ...cardStyle, borderLeft: '3px solid #FF6B00' }}>
          <div style={{ fontSize: 11, color: 'rgba(232,232,248,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>Today Trading</div>
          <div style={{ fontSize: 28, fontWeight: 800, fontFamily: 'Syne, sans-serif', color: trading.today_pnl >= 0 ? '#22DD88' : '#FF4444' }}>
            {trading.today_pnl != null ? `${trading.today_pnl >= 0 ? '+' : ''}₹${Number(trading.today_pnl).toFixed(0)}` : '—'}
          </div>
          <div style={{ fontSize: 12, color: 'rgba(232,232,248,0.4)', marginTop: 4 }}>
            {trading.active_algos != null ? `${trading.active_algos} active algo${trading.active_algos !== 1 ? 's' : ''}` : 'PRACTIX mode'}
          </div>
        </div>
        {/* Budget */}
        <div style={{ ...cardStyle, borderLeft: '3px solid #7C3AED' }}>
          <div style={{ fontSize: 11, color: 'rgba(232,232,248,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>Budget</div>
          <div style={{ fontSize: 28, fontWeight: 800, fontFamily: 'Syne, sans-serif', color: 'rgba(232,232,248,0.9)' }}>
            {budget.monthly != null ? `₹${Math.round(budget.monthly).toLocaleString('en-IN')}` : '—'}
          </div>
          <div style={{ fontSize: 12, color: 'rgba(232,232,248,0.4)', marginTop: 4 }}>spent this month</div>
        </div>
      </div>

      {/* 3-column layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 280px', gap: 16 }}>
        {/* Daily Briefing */}
        <div style={{ ...cardStyle, background: 'rgba(245,158,11,0.06)', borderColor: 'rgba(245,158,11,0.28)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ fontSize: 11, color: '#F59E0B', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 10, fontWeight: 600 }}>Daily Briefing</div>
          {loading ? (
            <div style={{ color: 'rgba(232,232,248,0.4)', fontSize: 14 }}>Generating briefing...</div>
          ) : (
            <div style={{ fontSize: 15, lineHeight: 1.65, color: 'rgba(232,232,248,0.85)' }}>{briefing}</div>
          )}
          <div style={{ marginTop: 14, fontSize: 11, color: 'rgba(232,232,248,0.3)' }}>Generated by LIFEX AI · 08:30 IST</div>
        </div>

        {/* Alerts */}
        <div style={cardStyle}>
          <div style={{ fontSize: 11, color: 'rgba(232,232,248,0.5)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12, fontWeight: 600 }}>Alerts & Insights</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {alerts.map((a, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 16 }}>{a.severity === 'warning' ? '⚠️' : a.severity === 'info' ? '✅' : '📅'}</span>
                <span style={{ fontSize: 13, color: 'rgba(232,232,248,0.8)', lineHeight: 1.4 }}>{a.message}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Module status */}
        <div style={cardStyle}>
          <div style={{ fontSize: 11, color: 'rgba(232,232,248,0.5)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12, fontWeight: 600 }}>Modules</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {MODULE_LINKS.map(m => (
              <div key={m.name} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: m.live ? '#22DD88' : 'rgba(232,232,248,0.2)', flexShrink: 0, boxShadow: m.live ? '0 0 6px #22DD88' : 'none' }} />
                {m.url ? (
                  <a href={m.url} target="_blank" rel="noreferrer" style={{ fontSize: 13, color: m.here ? '#F59E0B' : 'rgba(232,232,248,0.75)', textDecoration: 'none' }}>
                    {m.name}{m.here ? ' ← here' : ''}
                  </a>
                ) : (
                  <span style={{ fontSize: 13, color: m.live ? '#F59E0B' : 'rgba(232,232,248,0.3)' }}>
                    {m.name}{!m.live ? ' · soon' : ''}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
