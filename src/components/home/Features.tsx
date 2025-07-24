'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const features = [
  {
    id: 1,
    title: "Fortifying Security: Safeguarding IPFS Code with Immutable Blockchain Storage",
    image: "🔒",
    description: "Your meeting data is secured with blockchain technology"
  },
  {
    id: 2,
    title: "Seamless Access to Files: Unlocking the Power of IPFS with One-Click Convenience",
    image: "📁",
    description: "Easy file sharing through decentralized storage"
  }
]

export default function Features() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % features.length)
    }, 3000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="relative h-96 mb-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: index === currentSlide ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center"
            >
              <div className="text-8xl mb-6">{feature.image}</div>
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-4 max-w-4xl">
                {feature.title}
              </h3>
              <p className="text-gray-300 max-w-2xl">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center space-x-2">
          {features.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                index === currentSlide ? 'bg-white' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}