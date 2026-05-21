import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

function Home() {
  const [facilities, setFacilities] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('http://localhost:5000/facilities')
      .then(res => {
        setFacilities(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
  }, [])

  return (
    <div>
      {/* Banner Section */}
      <div className="bg-green-700 text-white py-24 px-6 text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to SportNest</h1>
        <p className="text-xl mb-8 text-green-200">Book your favorite sports facility easily and quickly</p>
        <Link to="/facilities" className="bg-white text-green-700 px-8 py-3 rounded-full font-bold text-lg hover:bg-green-100">
          Explore Facilities
        </Link>
      </div>

      {/* Featured Facilities */}
      <div className="max-w-6xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-10">Featured Facilities</h2>
        {loading ? (
          <div className="text-center text-xl">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.slice(0, 6).map(facility => (
              <div key={facility._id} className="border rounded-lg overflow-hidden shadow hover:shadow-lg">
                <img src={facility.image} alt={facility.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">{facility.name}</h3>
                  <p className="text-gray-600 mb-1">📍 {facility.location}</p>
                  <p className="text-gray-600 mb-1">🏷️ {facility.facility_type}</p>
                  <p className="text-green-700 font-bold mb-4">৳{facility.price_per_hour}/hour</p>
                  <Link to={`/facility/${facility._id}`} className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 w-full block text-center">
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Why Choose Us */}
      <div className="bg-gray-100 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Why Choose SportNest?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-2">Easy Booking</h3>
              <p className="text-gray-600">Book your favorite sports facility in just a few clicks</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-bold mb-2">Top Facilities</h3>
              <p className="text-gray-600">Access to the best sports facilities in your area</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-2">Best Prices</h3>
              <p className="text-gray-600">Get the best prices for all sports facilities</p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="max-w-6xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="bg-green-700 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
            <h3 className="font-bold mb-2">Browse</h3>
            <p className="text-gray-600">Browse available facilities</p>
          </div>
          <div>
            <div className="bg-green-700 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
            <h3 className="font-bold mb-2">Select</h3>
            <p className="text-gray-600">Select your preferred facility</p>
          </div>
          <div>
            <div className="bg-green-700 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
            <h3 className="font-bold mb-2">Book</h3>
            <p className="text-gray-600">Book your time slot</p>
          </div>
          <div>
            <div className="bg-green-700 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">4</div>
            <h3 className="font-bold mb-2">Play</h3>
            <p className="text-gray-600">Enjoy your game!</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home