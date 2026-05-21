import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

function ManageFacilities() {
  const [facilities, setFacilities] = useState([])
  const [loading, setLoading] = useState(true)
  const [editFacility, setEditFacility] = useState(null)
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }
    axios.get(`http://:5000/facilities/owner/${user.email}`, { withCredentials: true })
      .then(res => {
        setFacilities(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this facility?')) return
    try {
      await axios.delete(`http://:5000/facilities/${id}`, { withCredentials: true })
      setFacilities(facilities.filter(f => f._id !== id))
      toast.success('Facility deleted!')
    } catch (err) {
      toast.error('Failed to delete facility!')
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      await axios.put(`http://:5000/facilities/${editFacility._id}`, editFacility, { withCredentials: true })
      setFacilities(facilities.map(f => f._id === editFacility._id ? editFacility : f))
      setEditFacility(null)
      toast.success('Facility updated!')
    } catch (err) {
      toast.error('Failed to update facility!')
    }
  }

  if (loading) return <div className="text-center py-20 text-xl">Loading...</div>

  return (
    <div className="max-w-6xl mx-auto py-10 px-6">
      <h2 className="text-3xl font-bold text-center mb-8">Manage My Facilities</h2>

      {facilities.length === 0 ? (
        <div className="text-center text-gray-500 text-xl">No facilities found!</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map(facility => (
            <div key={facility._id} className="border rounded-lg overflow-hidden shadow">
              <img src={facility.image} alt={facility.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{facility.name}</h3>
                <p className="text-gray-600 mb-1">📍 {facility.location}</p>
                <p className="text-green-700 font-bold mb-4">৳{facility.price_per_hour}/hour</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditFacility(facility)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex-1"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(facility._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex-1"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editFacility && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white p-8 rounded-lg w-full max-w-lg max-h-screen overflow-y-auto">
            <h3 className="text-2xl font-bold mb-6">Update Facility</h3>
            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Facility Name</label>
                <input type="text" value={editFacility.name}
                  onChange={(e) => setEditFacility({ ...editFacility, name: e.target.value })}
                  className="w-full border px-4 py-2 rounded focus:outline-none focus:border-green-700" required />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Location</label>
                <input type="text" value={editFacility.location}
                  onChange={(e) => setEditFacility({ ...editFacility, location: e.target.value })}
                  className="w-full border px-4 py-2 rounded focus:outline-none focus:border-green-700" required />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Price Per Hour (৳)</label>
                <input type="number" value={editFacility.price_per_hour}
                  onChange={(e) => setEditFacility({ ...editFacility, price_per_hour: e.target.value })}
                  className="w-full border px-4 py-2 rounded focus:outline-none focus:border-green-700" required />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Description</label>
                <textarea value={editFacility.description}
                  onChange={(e) => setEditFacility({ ...editFacility, description: e.target.value })}
                  className="w-full border px-4 py-2 rounded focus:outline-none focus:border-green-700" rows="3" />
              </div>
              <div className="flex gap-4">
                <button type="submit" className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800 flex-1">
                  Save
                </button>
                <button type="button" onClick={() => setEditFacility(null)}
                  className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 flex-1">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default ManageFacilities