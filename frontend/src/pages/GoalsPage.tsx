const GOALS = [
  { id: 'G1', name: 'Emergency Fund', target: '₹6L', by: '2027', pct: 4, priority: 'HIGH', warn: true },
  { id: 'G2', name: 'Car Purchase', target: '₹12L', by: '2029', pct: 25, priority: 'MEDIUM', warn: false },
  { id: 'G3', name: 'Retirement', target: '₹5Cr', by: '2050', pct: 0.4, priority: 'HIGH', warn: false },
]

export default function GoalsPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center', gap: 20 }}>
      <div style={{ fontSize: 52 }}>🎯</div>
      <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 28, fontWeight: 800, color: '#F59E0B', margin: 0 }}>
        GOALEX — Goals & FI Planning
      </h2>
      <p style={{ fontSize: 15, color: 'rgba(232,232,248,0.55)', maxWidth: 420, lineHeight: 1.6, margin: 0 }}>
        Track your financial goals and your path to Financial Independence.
        FI target: ₹1.8Cr (30x annual expenses). Estimated: 2.8 years.
      </p>
      {/* Static goal preview */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', maxWidth: 440, marginTop: 8 }}>
        {GOALS.map(g => (
          <div key={g.id} style={{ background: 'rgba(22,22,28,0.72)', border: '1px solid rgba(245,158,11,0.18)', borderRadius: 10, padding: '12px 16px', textAlign: 'left' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(232,232,248,0.85)' }}>{g.name}</span>
              <span style={{ fontSize: 12, color: g.warn ? '#FF4444' : '#22DD88' }}>{g.pct}% {g.warn ? '⚠️' : ''}</span>
            </div>
            <div style={{ height: 4, background: 'rgba(232,232,248,0.1)', borderRadius: 2 }}>
              <div style={{ height: '100%', width: `${Math.min(g.pct, 100)}%`, background: g.warn ? '#FF4444' : '#F59E0B', borderRadius: 2 }} />
            </div>
            <div style={{ fontSize: 11, color: 'rgba(232,232,248,0.35)', marginTop: 4 }}>{g.target} by {g.by}</div>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 12, color: 'rgba(232,232,248,0.3)' }}>
        Full goal tracking coming in Phase 2
      </div>
    </div>
  )
}
