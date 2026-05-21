import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

function AddFacility() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    facility_type: '',
    image: '',
    location: '',
    price_per_hour: '',
    capacity: '',
    available_slots: '',
    description: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) {
      navigate('/login')
      return
    }
    setLoading(true)
    try {
      await axios.post('http://:5000/facilities', {
        ...formData,
        price_per_hour: Number(formData.price_per_hour),
        capacity: Number(formData.capacity),
        available_slots: formData.available_slots.split(',').map(s => s.trim()),
        owner_email: user.email
      }, { withCredentials: true })
      toast.success('Facility added successfully!')
      navigate('/manage-facilities')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add facility!')
    }
    setLoading(false)
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-green-700">Add Facility</h2>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Facility Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange}
            className="w-full border px-4 py-2 rounded focus:outline-none focus:border-green-700"
            placeholder="Enter facility name" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Facility Type</label>
          <select name="facility_type" value={formData.facility_type} onChange={handleChange}
            className="w-full border px-4 py-2 rounded focus:outline-none focus:border-green-700" required>
            <option value="">Select Type</option>
            <option value="Football">Football</option>
            <option value="Badminton">Badminton</option>
            <option value="Swimming">Swimming</option>
            <option value="Tennis">Tennis</option>
            <option value="Cricket">Cricket</option>
            <option value="Basketball">Basketball</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Image URL</label>
          <input type="text" name="image" value={formData.image} onChange={handleChange}
            className="w-full border px-4 py-2 rounded focus:outline-none focus:border-green-700"
            placeholder="Enter image URL" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Location</label>
          <input type="text" name="location" value={formData.location} onChange={handleChange}
            className="w-full border px-4 py-2 rounded focus:outline-none focus:border-green-700"
            placeholder="Enter location" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Price Per Hour (৳)</label>
          <input type="number" name="price_per_hour" value={formData.price_per_hour} onChange={handleChange}
            className="w-full border px-4 py-2 rounded focus:outline-none focus:border-green-700"
            placeholder="Enter price per hour" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Capacity</label>
          <input type="number" name="capacity" value={formData.capacity} onChange={handleChange}
            className="w-full border px-4 py-2 rounded focus:outline-none focus:border-green-700"
            placeholder="Enter capacity" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Available Time Slots</label>
          <input type="text" name="available_slots" value={formData.available_slots} onChange={handleChange}
            className="w-full border px-4 py-2 rounded focus:outline-none focus:border-green-700"
            placeholder="e.g. 8:00 AM - 10:00 AM, 10:00 AM - 12:00 PM" required />
          <p className="text-gray-500 text-sm mt-1">Separate multiple slots with commas</p>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange}
            className="w-full border px-4 py-2 rounded focus:outline-none focus:border-green-700"
            placeholder="Enter description" rows="4" required />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Owner Email</label>
          <input type="text" value={user?.email || ''}
            className="w-full border px-4 py-2 rounded bg-gray-100"
            readOnly />
        </div>
        <button type="submit" disabled={loading}
          className="w-full bg-green-700 text-white py-2 rounded font-bold hover:bg-green-800">
          {loading ? 'Adding...' : 'Add Facility'}
        </button>
      </form>
    </div>
  )
}

export default AddFacility