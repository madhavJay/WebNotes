import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router';
import { Plus, Home, Eye, Tv, Menu, X } from 'lucide-react';

const navItems = [
  { name: "Home", path: "/", icon: Home },
  { name: "View Notes", path: "/", icon: Eye },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.nav
      className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 text-black shadow-lg border-b-4 border-orange-600 relative overflow-hidden"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {/* Film Grain Overlay */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 80%, rgba(0,0,0,0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(0,0,0,0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(0,0,0,0.05) 0%, transparent 50%)
          `,
          backgroundSize: '100px 100px, 80px 80px, 60px 60px',
          animation: 'grain 0.3s steps(1) infinite'
        }}
      />
      
      {/* TV Static Lines */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="w-full h-px bg-black absolute top-2 animate-pulse"></div>
        <div className="w-full h-px bg-black absolute top-8 animate-pulse delay-75"></div>
        <div className="w-full h-px bg-black absolute bottom-4 animate-pulse delay-150"></div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex items-center justify-between px-6 py-4 font-bold tracking-wider">
        {/* Logo */}
        <Link to="/">
          <motion.div
            className="flex items-center space-x-3 text-xl lg:text-2xl font-extrabold relative z-10"
            whileHover={{ scale: 1.05, rotate: -1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="bg-black p-2 rounded-lg shadow-md relative">
              <Tv className="h-6 w-6 lg:h-8 lg:w-8 text-yellow-400" />
              <Tv className="h-6 w-6 lg:h-8 lg:w-8 text-red-400 absolute top-2 left-2 transform translate-x-0.5 opacity-30" />
              <Tv className="h-6 w-6 lg:h-8 lg:w-8 text-blue-400 absolute top-2 left-2 transform -translate-x-0.5 opacity-25" />
            </div>
            <div className="relative">
              <span className="relative z-10">MIDNIGHT NOTES</span>
              <span className="absolute top-0 left-0 transform translate-x-0.5 opacity-20 text-red-600">
                MIDNIGHT NOTES
              </span>
              <span className="absolute top-0 left-0 transform -translate-x-0.5 opacity-15 text-blue-600">
                MIDNIGHT NOTES
              </span>
            </div>
          </motion.div>
        </Link>

        {/* Navigation Items */}
        <div className="flex items-center space-x-4 lg:space-x-6">
          <ul className="flex space-x-4 lg:space-x-6 text-base lg:text-lg">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <motion.li
                  key={item.name}
                  className="relative group cursor-pointer z-10"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link to={item.path} className="flex items-center space-x-2 group-hover:text-white transition-colors">
                    <IconComponent className="h-4 w-4 lg:h-5 lg:w-5" />
                    <span className="hidden lg:block">{item.name}</span>
                  </Link>
                  <motion.div
                    className="absolute left-0 bottom-0 h-0.5 bg-black w-0 group-hover:w-full"
                    transition={{ duration: 0.3 }}
                    layout
                  />
                </motion.li>
              );
            })}
          </ul>

          {/* Create Note Button */}
          <Link to="/create">
            <motion.button
              className="bg-black hover:bg-gray-800 text-yellow-400 font-bold py-2 px-3 lg:px-4 rounded-lg 
                       shadow-md hover:shadow-lg border-2 border-yellow-400 hover:border-yellow-300 
                       flex items-center space-x-2 relative overflow-hidden z-10 text-sm lg:text-base"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="absolute inset-0 bg-red-600 transform translate-x-0.5 opacity-15"></div>
              <div className="absolute inset-0 bg-blue-600 transform -translate-x-0.5 opacity-10"></div>
              
              <Plus className="h-4 w-4 lg:h-5 lg:w-5 relative z-10" />
              <span className="relative z-10 hidden sm:block">New Note</span>
            </motion.button>
          </Link>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden px-4 py-3 flex items-center justify-between font-bold">
        {/* Mobile Logo */}
        <Link to="/">
          <div className="flex items-center space-x-2 text-lg font-extrabold relative z-10">
            <div className="bg-black p-1.5 rounded-lg shadow-md relative">
              <Tv className="h-6 w-6 text-yellow-400" />
              <Tv className="h-6 w-6 text-red-400 absolute top-1.5 left-1.5 transform translate-x-0.5 opacity-30" />
              <Tv className="h-6 w-6 text-blue-400 absolute top-1.5 left-1.5 transform -translate-x-0.5 opacity-25" />
            </div>
            <span className="relative z-10">MIDNIGHT</span>
          </div>
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="relative z-10 p-2 rounded-lg bg-black text-yellow-400 border-2 border-yellow-400"
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden absolute top-full left-0 right-0 bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 border-t-2 border-orange-600 z-50 shadow-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center space-x-3 text-lg font-bold hover:text-white transition-colors py-2"
                  >
                    <IconComponent className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              
              <Link
                to="/create"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center space-x-3 bg-black text-yellow-400 font-bold py-3 px-4 rounded-lg border-2 border-yellow-400 mt-4"
              >
                <Plus className="h-5 w-5" />
                <span>New Note</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* <style jsx>{`
        @keyframes grain {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          10% { transform: translate(-1%, -1%) rotate(1deg); }
          20% { transform: translate(1%, 1%) rotate(-1deg); }
          30% { transform: translate(-1%, 1%) rotate(0deg); }
          40% { transform: translate(1%, -1%) rotate(1deg); }
          50% { transform: translate(-1%, -1%) rotate(-1deg); }
          60% { transform: translate(1%, 1%) rotate(0deg); }
          70% { transform: translate(-1%, 1%) rotate(-1deg); }
          80% { transform: translate(1%, -1%) rotate(1deg); }
          90% { transform: translate(-1%, -1%) rotate(0deg); }
        }
      `}</style> */}
      
    </motion.nav>
  );
};

export default Navbar;