import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import logo from '../../../docs/octofitapp-small.png'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
          <div className="container-fluid">
            <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
              <img src={logo} alt="OctoFit logo" height="32" className="d-inline-block" />
              <span>OctoFit Tracker</span>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">
                    Activities
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">
                    Workouts
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/users">
                    Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">
                    Teams
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">
                    Leaderboard
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <main className="container mt-4 mb-5">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

function Home() {
  return (
    <div className="row justify-content-center">
      <div className="col-lg-8 text-center">
        <div className="mb-4">
          <img src={logo} alt="OctoFit Tracker logo" className="img-fluid" style={{ maxWidth: '180px' }} />
        </div>
        <h1 className="mb-4">Welcome to OctoFit Tracker</h1>
        <p className="lead text-muted">
          Track your activities, manage your workouts, build teams, and compete on the leaderboard.
        </p>
        <div className="mt-4">
          <p className="text-secondary">
            Use the navigation menu above to get started.
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
