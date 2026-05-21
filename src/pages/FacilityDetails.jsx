import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

function FacilityDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [facility, setFacility] = useState(null)
  const [loading, setLoading] = useState(true)
  const [bookingDate, setBookingDate] = useState('')
  const [timeSlot, setTimeSlot] = useState('')
  const [hours, setHours] = useState(1)

  useEffect(() => {
    axios.get(`http://:5000/facilities/${id}`)
      .then(res => {
        setFacility(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
  }, [id])

  const handleBooking = async (e) => {
    e.preventDefault()
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user) {
      navigate('/login')
      return
    }
    try {
      await axios.post('http://:5000/bookings', {
        facility_id: id,
        user_email: user.email,
        booking_date: bookingDate,
        time_slot: timeSlot,
        hours: hours,
        total_price: facility.price_per_hour * hours,
        status: 'pending'
      }, { withCredentials: true })
      toast.success('Booking successful!')
      navigate('/my-bookings')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Booking failed!')
    }
  }

  if (loading) return <div className="text-center py-20 text-xl">Loading...</div>
  if (!facility) return <div className="text-center py-20 text-xl">Facility not found!</div>

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      <img src={facility.image} alt={facility.name} className="w-full h-64 object-cover rounded-lg mb-6" />
      <h2 className="text-3xl font-bold mb-4">{facility.name}</h2>
      <p className="text-gray-600 mb-2">📍 {facility.location}</p>
      <p className="text-gray-600 mb-2">🏷️ {facility.facility_type}</p>
      <p className="text-gray-600 mb-2">👥 Capacity: {facility.capacity}</p>
      <p className="text-green-700 font-bold text-xl mb-4">৳{facility.price_per_hour}/hour</p>
      <p className="text-gray-700 mb-8">{facility.description}</p>

      <div className="bg-gray-100 p-6 rounded-lg">
        <h3 className="text-2xl font-bold mb-6">Book This Facility</h3>
        <form onSubmit={handleBooking}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Facility Name</label>
            <input
              type="text"
              value={facility.name}
              className="w-full border px-4 py-2 rounded bg-white"
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Booking Date</label>
            <input
              type="date"
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              className="w-full border px-4 py-2 rounded focus:outline-none focus:border-green-700"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Time Slot</label>
            <select
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
              className="w-full border px-4 py-2 rounded focus:outline-none focus:border-green-700"
              required
            >
              <option value="">Select Time Slot</option>
              {facility.available_slots?.map((slot, index) => (
                <option key={index} value={slot}>{slot}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Hours</label>
            <input
              type="number"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              min="1"
              max="8"
              className="w-full border px-4 py-2 rounded focus:outline-none focus:border-green-700"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Total Price</label>
            <input
              type="text"
              value={`৳${facility.price_per_hour * hours}`}
              className="w-full border px-4 py-2 rounded bg-white"
              readOnly
            />
          </div>
          <button type="submit" className="w-full bg-green-700 text-white py-2 rounded font-bold hover:bg-green-800">
            Confirm Booking
          </button>
          
        </form>
      </div>
    </div>
  )
}

export default FacilityDetails