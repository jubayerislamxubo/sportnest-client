import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

function MyBookings() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }
    axios.get(`http://:5000/bookings/${user.email}`, { withCredentials: true })
      .then(res => {
        setBookings(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
  }, [])

  const handleCancel = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return
    try {
      await axios.delete(`http://:5000/bookings/${id}`, { withCredentials: true })
      setBookings(bookings.filter(b => b._id !== id))
      toast.success('Booking cancelled!')
    } catch (err) {
      toast.error('Failed to cancel booking!')
    }
  }

  if (loading) return <div className="text-center py-20 text-xl">Loading...</div>

  return (
    <div className="max-w-6xl mx-auto py-10 px-6">
      <h2 className="text-3xl font-bold text-center mb-8">My Bookings</h2>
      {bookings.length === 0 ? (
        <div className="text-center text-gray-500 text-xl">No bookings found!</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white shadow rounded-lg">
            <thead>
              <tr className="bg-green-700 text-white">
                <th className="px-4 py-3 text-left">Facility</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Time Slot</th>
                <th className="px-4 py-3 text-left">Price</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(booking => (
                <tr key={booking._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{booking.facility_name}</td>
                  <td className="px-4 py-3">{booking.booking_date}</td>
                  <td className="px-4 py-3">{booking.time_slot}</td>
                  <td className="px-4 py-3">৳{booking.total_price}</td>
                  <td className="px-4 py-3">
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleCancel(booking._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default MyBookings