import React from 'react'
import HomePage from './pages/home'
import CreatePage from './pages/create'
import ViewPage from './pages/view'
import { Route, Routes } from 'react-router'
import { toast } from 'react-hot-toast'

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      {/* Midnight Channel Background */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 80%, rgba(255,215,0,0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255,215,0,0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(255,215,0,0.05) 0%, transparent 50%)
          `,
          backgroundSize: '200px 200px, 150px 150px, 100px 100px',
          animation: 'staticGrain 0.4s steps(1) infinite'
        }}
      />

      {/* TV Static Lines */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="w-full h-px bg-yellow-400 absolute top-1/4 animate-pulse"></div>
        <div className="w-full h-px bg-yellow-400 absolute top-2/4 animate-pulse delay-100"></div>
        <div className="w-full h-px bg-yellow-400 absolute top-3/4 animate-pulse delay-200"></div>
      </div>

      {/* Floating TV Screens */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top Left TV */}
        <div className="absolute -top-10 -left-10 w-32 h-24 bg-yellow-400 opacity-5 rounded-lg animate-pulse delay-300"></div>
        
        {/* Top Right TV */}
        <div className="absolute -top-10 -right-10 w-28 h-20 bg-yellow-400 opacity-5 rounded-lg animate-pulse delay-500"></div>
        
        {/* Bottom Center TV */}
        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-36 h-28 bg-yellow-400 opacity-5 rounded-lg animate-pulse delay-700"></div>
      </div>

      {/* Yellow Glow Effects */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-yellow-400 opacity-5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-orange-400 opacity-5 rounded-full blur-3xl animate-pulse delay-300"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-300 opacity-3 rounded-full blur-3xl animate-pulse delay-500"></div>

      {/* Chromatic Aberration Overlays */}
      <div className="absolute inset-0 bg-red-900 opacity-5 mix-blend-multiply"></div>
      <div className="absolute inset-0 bg-blue-900 opacity-5 mix-blend-multiply"></div>

      {/* Content Container */}
      <div className="relative z-10 min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/view/:id" element={<ViewPage />} />
        </Routes>
      </div>

      {/* CSS for animations */}
      <style>{`
        @keyframes staticGrain {
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
  )
}

export default App