import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/layout/Layout'
import DashboardPage from './pages/DashboardPage'
import NetWorthPage from './pages/NetWorthPage'
import GoalsPage from './pages/GoalsPage'
import BriefingsPage from './pages/BriefingsPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/networth" element={<NetWorthPage />} />
          <Route path="/goals" element={<GoalsPage />} />
          <Route path="/briefings" element={<BriefingsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
