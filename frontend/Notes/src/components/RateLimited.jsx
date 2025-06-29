import React from 'react';
import { motion } from 'framer-motion';
import { Tv, AlertTriangle, Clock, RefreshCw } from 'lucide-react';
import { Link } from 'react-router';

const RateLimited = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black flex items-center justify-center relative overflow-hidden">
      {/* TV Static Background */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(255,255,255,0.05) 0%, transparent 50%)
          `,
          backgroundSize: '100px 100px, 80px 80px, 60px 60px',
          animation: 'grain 0.5s steps(1) infinite'
        }}
      />

      {/* Static Lines */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="w-full h-px bg-yellow-400 absolute top-1/4 animate-pulse"></div>
        <div className="w-full h-px bg-yellow-400 absolute top-2/4 animate-pulse delay-100"></div>
        <div className="w-full h-px bg-yellow-400 absolute top-3/4 animate-pulse delay-200"></div>
      </div>

      <motion.div 
        className="text-center px-6 relative z-10 max-w-2xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* TV Icon with Glitch Effect */}
        <motion.div
          className="flex justify-center mb-8"
          animate={{ 
            rotate: [0, -2, 2, -1, 1, 0],
            scale: [1, 1.05, 1, 1.02, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <div className="relative">
            <div className="bg-yellow-400 p-6 rounded-2xl shadow-2xl border-4 border-yellow-500">
              <Tv className="h-20 w-20 text-black" />
              {/* Chromatic aberration */}
              <Tv className="h-20 w-20 text-red-500 absolute top-6 left-6 transform translate-x-1 opacity-40" />
              <Tv className="h-20 w-20 text-blue-500 absolute top-6 left-6 transform -translate-x-1 opacity-30" />
            </div>
            
            {/* Glitch overlay */}
            <motion.div
              className="absolute inset-0 bg-red-500 opacity-20 rounded-2xl"
              animate={{ 
                opacity: [0, 0.3, 0, 0.2, 0],
                x: [0, 2, -2, 1, 0]
              }}
              transition={{ 
                duration: 0.3,
                repeat: Infinity,
                repeatDelay: 2
              }}
            />
          </div>
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-6xl font-bold text-yellow-400 mb-4 relative">
            <span className="relative z-10">SIGNAL LOST</span>
            {/* Text chromatic aberration */}
            <span className="absolute top-0 left-20 text-red-500 transform translate-x-1 opacity-30">
              SIGNAL LOST
            </span>
            <span className="absolute top-0 left-20 text-blue-500 transform -translate-x-1 opacity-25">
              SIGNAL LOST
            </span>
          </h1>
          
          <motion.div
            className="flex items-center justify-center space-x-3 text-2xl text-gray-300 mb-6"
            animate={{ opacity: [1, 0.7, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <AlertTriangle className="h-8 w-8 text-yellow-400" />
            <span>Rate Limited</span>
            <AlertTriangle className="h-8 w-8 text-yellow-400" />
          </motion.div>

          <p className="text-lg text-gray-400 mb-8 leading-relaxed">
            The Midnight Channel is experiencing technical difficulties.<br />
            Too many requests have been detected from your location.<br />
            Please wait before attempting to reconnect to the TV World.
          </p>
        </motion.div>

        {/* Status Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="bg-black bg-opacity-50 border-2 border-yellow-400 rounded-lg p-6 mb-8 backdrop-blur-sm"
        >
          <div className="flex items-center justify-center space-x-3 text-yellow-400 mb-4">
            <Clock className="h-6 w-6" />
            <span className="text-lg font-bold">Investigation Cooldown Active</span>
          </div>
          <p className="text-gray-300">
            Wait time: <span className="text-yellow-400 font-bold">60 seconds</span>
          </p>
          <p className="text-gray-300 text-sm mt-2">
            Error Code: <span className="text-red-400 font-mono">P4_RATE_LIMIT_429</span>
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            onClick={handleRefresh}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-lg 
                     shadow-lg border-2 border-yellow-500 flex items-center space-x-2 
                     transform transition-all duration-200 relative overflow-hidden"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Button chromatic aberration */}
            <div className="absolute inset-0 bg-red-500 transform translate-x-0.5 opacity-20"></div>
            <div className="absolute inset-0 bg-blue-500 transform -translate-x-0.5 opacity-15"></div>
            
            <RefreshCw className="h-5 w-5 relative z-10" />
            <span className="relative z-10">Try Again</span>
          </motion.button>

          <Link to="/">
            <motion.button
              className="bg-transparent hover:bg-yellow-400 hover:text-black text-yellow-400 
                       font-bold py-3 px-6 rounded-lg border-2 border-yellow-400 
                       transform transition-all duration-200"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Return to Investigation HQ
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>

      <style jsx>{`
        @keyframes grain {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          10% { transform: translate(-2%, -2%) rotate(1deg); }
          20% { transform: translate(2%, 2%) rotate(-1deg); }
          30% { transform: translate(-2%, 2%) rotate(0deg); }
          40% { transform: translate(2%, -2%) rotate(1deg); }
          50% { transform: translate(-2%, -2%) rotate(-1deg); }
          60% { transform: translate(2%, 2%) rotate(0deg); }
          70% { transform: translate(-2%, 2%) rotate(-1deg); }
          80% { transform: translate(2%, -2%) rotate(1deg); }
          90% { transform: translate(-2%, -2%) rotate(0deg); }
        }
      `}</style>
    </div>
  );
};

export default RateLimited;