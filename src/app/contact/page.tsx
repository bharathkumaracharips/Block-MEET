'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Mail, Phone, MapPin } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black pt-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto"
        >
          <div className="flex items-center gap-4 mb-8">
            <Link href="/" className="text-white hover:text-gray-300">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-3xl font-bold text-white">Contact Us</h1>
          </div>
          
          <div className="bg-gray-900 p-8 rounded-lg space-y-6">
            <div className="flex items-center gap-4">
              <Mail className="text-blue-400" size={24} />
              <div>
                <h3 className="text-white font-semibold">Email</h3>
                <p className="text-gray-400">contact@block-meet.com</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Phone className="text-blue-400" size={24} />
              <div>
                <h3 className="text-white font-semibold">Phone</h3>
                <p className="text-gray-400">+1 (555) 123-4567</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <MapPin className="text-blue-400" size={24} />
              <div>
                <h3 className="text-white font-semibold">Address</h3>
                <p className="text-gray-400">123 Blockchain Street, Crypto City</p>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-gray-400">TEAM ANONYMOUS</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}