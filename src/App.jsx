import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import AllFacilities from './pages/AllFacilities'
import FacilityDetails from './pages/FacilityDetails'
import AddFacility from './pages/AddFacility'
import MyBookings from './pages/MyBookings'
import ManageFacilities from './pages/ManageFacilities'
import NotFound from './pages/NotFound'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/facilities" element={<AllFacilities />} />
        <Route path="/facility/:id" element={<FacilityDetails />} />
        <Route path="/add-facility" element={<AddFacility />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/manage-facilities" element={<ManageFacilities />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App