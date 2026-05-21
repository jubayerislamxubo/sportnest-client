import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function AllFacilities() {
  const [facilities, setFacilities] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterType, setFilterType] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`http://:5000/facilities?search=${search}&type=${filterType}`)
      .then(res => {
        setFacilities(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
  }, [search, filterType])

  const handleBookNow = (id) => {
    const user = localStorage.getItem('user')
    if (!user) {
      navigate('/login')
    } else {
      navigate(`/facility/${id}`)
    }
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-6">
      <h2 className="text-3xl font-bold text-center mb-8">All Facilities</h2>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by facility name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 rounded w-full focus:outline-none focus:border-green-700"
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="border px-4 py-2 rounded w-full md:w-64 focus:outline-none focus:border-green-700"
        >
          <option value="">All Types</option>
          <option value="Football">Football</option>
          <option value="Badminton">Badminton</option>
          <option value="Swimming">Swimming</option>
          <option value="Tennis">Tennis</option>
          <option value="Cricket">Cricket</option>
          <option value="Basketball">Basketball</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center text-xl">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map(facility => (
            <div key={facility._id} className="border rounded-lg overflow-hidden shadow hover:shadow-lg">
              <img src={facility.image} alt={facility.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{facility.name}</h3>
                <p className="text-gray-600 mb-1">📍 {facility.location}</p>
                <p className="text-gray-600 mb-1">🏷️ {facility.facility_type}</p>
                <p className="text-gray-600 mb-1">👥 Capacity: {facility.capacity}</p>
                <p className="text-green-700 font-bold mb-4">৳{facility.price_per_hour}/hour</p>
                <button
                  onClick={() => handleBookNow(facility._id)}
                  className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 w-full"
                >
                  
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AllFacilities