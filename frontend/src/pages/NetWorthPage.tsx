const ASSETS = [
  { label: 'Equity', pct: 52, color: '#22DD88' },
  { label: 'Debt', pct: 9, color: '#4488FF' },
  { label: 'Alternatives', pct: 39, color: '#F59E0B' },
]

export default function NetWorthPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center', gap: 20 }}>
      <div style={{ fontSize: 52 }}>🏗️</div>
      <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 28, fontWeight: 800, color: '#F59E0B', margin: 0 }}>
        NETEX — Net Worth Engine
      </h2>
      <p style={{ fontSize: 15, color: 'rgba(232,232,248,0.55)', maxWidth: 420, lineHeight: 1.6, margin: 0 }}>
        Aggregates all your assets and liabilities into one live net worth number.
        Equity, debt, real estate, gold, and loans — all in one balance sheet.
      </p>
      {/* Static preview */}
      <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
        {ASSETS.map(a => (
          <div key={a.label} style={{ background: 'rgba(22,22,28,0.72)', border: `1px solid ${a.color}40`, borderRadius: 10, padding: '12px 20px', textAlign: 'center' }}>
            <div style={{ fontSize: 22, fontWeight: 800, fontFamily: 'Syne, sans-serif', color: a.color }}>{a.pct}%</div>
            <div style={{ fontSize: 12, color: 'rgba(232,232,248,0.45)', marginTop: 2 }}>{a.label}</div>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 12, color: 'rgba(232,232,248,0.3)', marginTop: 8 }}>
        Coming in Phase 2 · Current net worth: ₹1.32Cr
      </div>
    </div>
  )
}
