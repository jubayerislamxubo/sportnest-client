import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Navbar() {
  const [user, setUser] = useState(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (stored) {
      setUser(JSON.parse(stored))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    setUser(null)
    navigate('/')
  }

  return (
    <nav className="bg-green-700 text-white px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">
        🏟️ SportNest
      </Link>

      <div className="flex gap-6 items-center">
        <Link to="/" className="hover:text-green-200">Home</Link>
        <Link to="/facilities" className="hover:text-green-200">All Facilities</Link>

        {user ? (
          <div className="relative">
            <div
              className="w-10 h-10 rounded-full cursor-pointer bg-white text-green-700 flex items-center justify-center font-bold text-lg"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {user.name?.charAt(0).toUpperCase()}
            </div>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-lg w-48 z-50">
                <p className="px-4 py-2 font-bold border-b">{user.name}</p>
                <Link to="/my-bookings" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setDropdownOpen(false)}>My Bookings</Link>
                <Link to="/add-facility" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setDropdownOpen(false)}>Add Facility</Link>
                <Link to="/manage-facilities" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setDropdownOpen(false)}>Manage Facilities</Link>
                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500">Logout</button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="bg-white text-green-700 px-4 py-2 rounded font-semibold hover:bg-green-100">
            Login
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar