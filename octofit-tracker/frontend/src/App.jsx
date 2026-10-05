import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import logo from '../../../docs/octofitapp-small.png'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const navigation = [
  { label: 'Users', path: '/users' },
  { label: 'Teams', path: '/teams' },
  { label: 'Activities', path: '/activities' },
  { label: 'Leaderboard', path: '/leaderboard' },
  { label: 'Workouts', path: '/workouts' },
]

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="container app-header-inner">
          <NavLink className="brand" to="/users" aria-label="OctoFit Tracker home">
            <img src={logo} alt="" className="brand-logo" />
            <span>OctoFit Tracker</span>
          </NavLink>
          <nav className="nav app-nav" aria-label="Main navigation">
            {navigation.map(({ label, path }) => (
              <NavLink
                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                key={path}
                to={path}
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="container app-main">
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<p className="alert alert-warning">Page not found.</p>} />
        </Routes>
      </main>

      <footer className="app-footer">
        <div className="container">Move together. Get stronger together.</div>
      </footer>
    </div>
  )
}

export default App
