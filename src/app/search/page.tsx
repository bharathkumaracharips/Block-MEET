'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Search } from 'lucide-react'

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-black pt-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="flex items-center gap-4 mb-8">
            <Link href="/" className="text-white hover:text-gray-300">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-3xl font-bold text-white">Search</h1>
          </div>
          
          <div className="bg-gray-900 p-8 rounded-lg">
            <Search size={48} className="text-gray-400 mx-auto mb-4" />
            <p className="text-gray-400">Search functionality coming soon...</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}