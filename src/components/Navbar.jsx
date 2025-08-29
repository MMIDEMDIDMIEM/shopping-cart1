import React from 'react'
import img from "../assets/Removal-191.png"
import { useCart } from '../context/cartContext'
import { useUser } from '../context/UserContext'
import { MdShoppingCart } from "react-icons/md"
import { Link, useNavigate } from 'react-router-dom'
import Theme from '../Pages/Theme'
import { motion } from "framer-motion"
import { IoMdHeart } from "react-icons/io";


function Navbar() {
  const { cart } = useCart()
  const { user ,logout } = useUser()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <div className="bg-blue-500 h-14 flex justify-between gap-10 px-10 md:px-[170px] items-center  shadow-md">
      {/* ✅ Logo */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
      >
        <img 
          src={img} 
          className="w-[150px] md:w-[150px] sm:px-1 h-14 bg-white rounded-md shadow sm:w-[70px] " 
          alt="logo" 
        />
      </motion.div>

      {user ? (
        <motion.div 
          className="flex items-center gap-6"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.3 }}
        >
          <button 
            onClick={handleLogout}
            className="text-white font-semibold hover:text-yellow-300 transition"
          >
            LogOut
          </button>

          {/* ✅ Cart with Badge */}
          <Link to="/cart" className="relative flex items-center">
            <MdShoppingCart size={28} className="text-white hover:text-yellow-300 transition" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cart.length}
              </span>
            )}
          </Link>

          <Link to="/favourite"><IoMdHeart className='text-white text-3xl ' /></Link>


          <Theme />
        </motion.div>
      ) : (
        <motion.div 
          className="flex gap-6 text-white font-semibold"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.2 }}
        >
          <Link to="/login" className="hover:text-yellow-300 transition">Sign In</Link>
          <Link to="/signup" className="hover:text-yellow-300 transition">Sign Up</Link>
        </motion.div>
      )}
    </div>
  )
}

export default Navbar
