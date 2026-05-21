import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-9xl font-bold text-green-700">404</h1>
      <h2 className="text-3xl font-bold mt-4 mb-4">Page Not Found</h2>
      <p className="text-gray-600 mb-8">Oops! The page you are looking for does not exist.</p>
      <Link to="/" className="bg-green-700 text-white px-8 py-3 rounded-full font-bold hover:bg-green-800">
        Back to Home
      </Link>
    </div>
  )
}

export default NotFound