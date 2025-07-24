'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Copy, Check } from 'lucide-react'

export default function CreateMeetingPage() {
  const [meetingId, setMeetingId] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    // Generate unique meeting ID
    const timestamp = Date.now().toString(36)
    const randomPart = Math.random().toString(36).substr(2, 5)
    const uniqueId = timestamp + randomPart
    setMeetingId(uniqueId)
  }, [])

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(meetingId)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
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
        <h1 className="text-4xl font-bold text-white mb-8">Create Meeting</h1>
        
        <div className="bg-gray-900 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Your Meeting ID:</h2>
          <div className="flex items-center gap-2 mb-4">
            <code className="bg-gray-800 text-white px-4 py-2 rounded flex-1 font-mono">
              {meetingId}
            </code>
            <button
              onClick={copyToClipboard}
              className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors"
              title="Copy to clipboard"
            >
              {copied ? <Check size={20} /> : <Copy size={20} />}
            </button>
          </div>
          {copied && (
            <p className="text-green-400 text-sm">Meeting ID copied to clipboard!</p>
          )}
        </div>
        
        <Link href={`/meeting/conference/${meetingId}?admin=true`}>
          <button className="w-full bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center gap-2">
            <ArrowRight size={20} />
            Start Meeting
          </button>
        </Link>
        
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