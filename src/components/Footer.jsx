function Footer() {
  return (
    <footer className="bg-green-700 text-white mt-10 py-10 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div>
          <h3 className="text-xl font-bold mb-3">🏟️ SportNest</h3>
          <p className="text-green-200">Your ultimate sports facility booking platform.</p>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-3">Contact</h3>
          <p className="text-green-200">Email: sportnest@gmail.com</p>
          <p className="text-green-200">Phone: +880 1234-567890</p>
          <p className="text-green-200">Address: Dhaka, Bangladesh</p>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-3">Follow Us</h3>
          <div className="flex gap-4">
            <a href="#" className="text-green-200 hover:text-white">Facebook</a>
            <a href="#" className="text-green-200 hover:text-white">X</a>
            <a href="#" className="text-green-200 hover:text-white">Instagram</a>
          </div>
        </div>

      </div>
      <div className="text-center mt-8 text-green-300">
        <p>© 2024 SportNest. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer