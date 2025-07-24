'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { LogIn } from 'lucide-react'

export default function JoinMeetingPage() {
  const [meetingId, setMeetingId] = useState('')
  const router = useRouter()

  const handleJoinMeeting = (e: React.FormEvent) => {
    e.preventDefault()
    if (meetingId.trim()) {
      router.push(`/meeting/conference/${meetingId}`)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-md w-full"
      >
        <h1 className="text-4xl font-bold text-white mb-8">Enter Meeting</h1>
        
        <form onSubmit={handleJoinMeeting} className="space-y-6">
          <div>
            <label htmlFor="meetingId" className="block text-white mb-2">
              Enter Meeting ID:
            </label>
            <input
              type="text"
              id="meetingId"
              value={meetingId}
              onChange={(e) => setMeetingId(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="Enter meeting ID..."
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <LogIn size={20} />
            Join Meeting
          </button>
        </form>
        
        <div className="mt-8">
          <Link href="/" className="text-gray-400 hover:text-white transition-colors">
            ← Back to Home
          </Link>
        </div>
        
        <div className="mt-16">
          <p className="text-gray-400 text-sm">TEAM ANONYMOUS</p>
        </div>
      </motion.div>
    </div>
  )
}