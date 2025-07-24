'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Home, Search, User, Settings } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Hero from '@/components/home/Hero'
import Features from '@/components/home/Features'
import Footer from '@/components/layout/Footer'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <Hero />
      <Features />
      <Footer />
    </div>
  )
}