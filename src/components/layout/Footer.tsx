'use client'

import Link from 'next/link'
import { Facebook, Twitter, Instagram } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 py-16 px-4 mt-16">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Web design</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Development</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Hosting</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">About</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Company</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Team</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Legacy</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Careers</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Job openings</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Employee success</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Benefits</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4 mb-4">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={24} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={24} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={24} />
              </Link>
            </div>
            <p className="text-gray-400 text-sm">TEAM ANONYMOUS © 2024</p>
          </div>
        </div>
      </div>
    </footer>
  )
}