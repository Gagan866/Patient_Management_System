import { Link, useNavigate } from 'react-router-dom'
import '../styles/navbar.css'

function Navbar({ activeView = 'dashboard' }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <header className="dashboard-navbar">
      <div className="navbar-left">
        <h1>Hospital Management System</h1>
      </div>

      <nav className="navbar-center" aria-label="Main navigation">
        <Link
          to="/dashboard"
          className={activeView === 'dashboard' ? 'nav-link active' : 'nav-link'}
        >
          Dashboard
        </Link>
        <Link
          to="/patients"
          className={activeView === 'patients' ? 'nav-link active' : 'nav-link'}
        >
          Patients
        </Link>
        <Link
          to="/appointments"
          className={activeView === 'appointments' ? 'nav-link active' : 'nav-link'}
        >
          Appointments
        </Link>
        <Link
          to="/doctors"
          className={activeView === 'doctors' ? 'nav-link active' : 'nav-link'}
        >
          Doctors
        </Link>
      </nav>

      <div className="navbar-right">
        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  )
}

export default Navbar
