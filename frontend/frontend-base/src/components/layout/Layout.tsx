import { NavLink, Outlet } from 'react-router-dom'

const NAV = [
  { label: 'Dashboard', path: '/', icon: '◈' },
  { label: 'Net Worth', path: '/networth', icon: '◎', soon: true },
  { label: 'Goals & FI', path: '/goals', icon: '◉', soon: true },
  { label: 'Briefings', path: '/briefings', icon: '◷', soon: true },
]

export default function Layout() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-base, #0d0d10)', color: 'rgba(232,232,248,0.92)', fontFamily: 'DM Sans, sans-serif' }}>
      {/* Sidebar */}
      <aside style={{ width: 216, flexShrink: 0, background: 'rgba(18,18,22,0.96)', borderRight: '1px solid var(--fx-border, rgba(245,158,11,0.22))', display: 'flex', flexDirection: 'column', padding: '24px 0' }}>
        {/* Logo */}
        <div style={{ padding: '0 24px 28px', borderBottom: '1px solid rgba(245,158,11,0.12)' }}>
          <div style={{ fontSize: 28, fontWeight: 800, fontFamily: 'Syne, sans-serif', background: 'linear-gradient(135deg, #F59E0B 0%, #FCD34D 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            FX
          </div>
          <div style={{ fontSize: 11, color: 'rgba(232,232,248,0.4)', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 2 }}>
            Personal CFO
          </div>
        </div>
        {/* Nav */}
        <nav style={{ flex: 1, padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {NAV.map(item => (
            item.soon ? (
              <div key={item.path} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 8, opacity: 0.4, cursor: 'default', fontSize: 14 }}>
                <span style={{ fontSize: 16 }}>{item.icon}</span>
                <span>{item.label}</span>
                <span style={{ marginLeft: 'auto', fontSize: 10, color: '#F59E0B', border: '1px solid rgba(245,158,11,0.3)', borderRadius: 4, padding: '1px 5px' }}>SOON</span>
              </div>
            ) : (
              <NavLink key={item.path} to={item.path} end style={({ isActive }) => ({ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 8, fontSize: 14, textDecoration: 'none', color: isActive ? '#F59E0B' : 'rgba(232,232,248,0.7)', background: isActive ? 'rgba(245,158,11,0.10)' : 'transparent', borderLeft: isActive ? '2px solid #F59E0B' : '2px solid transparent' })}>
                <span style={{ fontSize: 16 }}>{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            )
          ))}
        </nav>
        {/* Footer */}
        <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(245,158,11,0.12)', fontSize: 11, color: 'rgba(232,232,248,0.3)' }}>
          FINEX BETA · v0.1
        </div>
      </aside>
      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
        {/* TopBar */}
        <header style={{ height: 56, borderBottom: '1px solid rgba(245,158,11,0.12)', display: 'flex', alignItems: 'center', padding: '0 28px', gap: 12, background: 'rgba(13,13,16,0.8)', flexShrink: 0 }}>
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 16, color: 'rgba(232,232,248,0.9)' }}>FINEX</span>
          <span style={{ fontSize: 13, color: 'rgba(232,232,248,0.4)' }}>Personal CFO</span>
          <div style={{ marginLeft: 'auto', background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.35)', borderRadius: 20, padding: '3px 10px', fontSize: 11, color: '#F59E0B', fontWeight: 600, letterSpacing: '0.08em' }}>
            BETA
          </div>
        </header>
        <main style={{ flex: 1, padding: 28, overflowY: 'auto' }}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
