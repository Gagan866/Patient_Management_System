import Navbar from '../pages/Navbar'

function Layout({ activeView = 'dashboard', children }) {
  return (
    <div className="app-shell">
      <Navbar activeView={activeView} />
      {children}
    </div>
  )
}

export default Layout
