export default function BriefingsPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center', gap: 16 }}>
      <div style={{ fontSize: 52 }}>📰</div>
      <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 28, fontWeight: 800, color: '#F59E0B', margin: 0 }}>
        Daily Briefing History
      </h2>
      <p style={{ fontSize: 15, color: 'rgba(232,232,248,0.55)', maxWidth: 400, lineHeight: 1.6, margin: 0 }}>
        Every morning at 08:30 IST, LIFEX AI generates your personal financial briefing —
        trading performance, budget status, goal progress, and alerts.
      </p>
      <div style={{ fontSize: 12, color: 'rgba(232,232,248,0.3)', marginTop: 8 }}>
        Coming in Phase 2
      </div>
    </div>
  )
}
