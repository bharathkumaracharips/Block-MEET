'use client'

import Link from 'next/link'
import { Home, Search, User, Settings } from 'lucide-react'

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-sm z-50 border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-white">
            Block-MEET
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link href="/" className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors">
              <Home size={20} />
              <span>Home</span>
            </Link>
            <Link href="/search" className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors">
              <Search size={20} />
              <span>Search</span>
            </Link>
            <Link href="/contact" className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors">
              <User size={20} />
              <span>Contact</span>
            </Link>
            <Link href="/login" className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors">
              <Settings size={20} />
              <span>Login</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}