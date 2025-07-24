'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Hero() {
  const [displayText, setDisplayText] = useState('')
  const fullText = "INTRODUCING BLOCK-MEET: REDEFINING VIRTUAL COLLABORATION."

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setDisplayText(fullText.slice(0, index + 1))
        index++
      } else {
        clearInterval(timer)
      }
    }, 60)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="pt-24 pb-16 px-4">
      <div className="container mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-8 h-20">
            {displayText}
            <span className="animate-pulse">|</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-12"
        >
          <div className="w-80 h-80 mx-auto mb-8 relative">
            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-6xl">🚀</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Revolutionize your meetings
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold text-white mb-4">
            with unparalleled security against
          </h3>
          <h3 className="text-3xl md:text-5xl font-bold text-white">
            data tampering or deletion.
          </h3>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <Link href="/meeting/join">
            <button className="meeting-button">
              JOIN MEETING
            </button>
          </Link>
          <Link href="/meeting/create">
            <button className="meeting-button">
              CREATE MEETING
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}