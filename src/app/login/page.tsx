'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Wallet } from 'lucide-react'
import { useWeb3 } from '@/contexts/Web3Context'

export default function LoginPage() {
  const { account, isConnected, connectWallet, disconnectWallet } = useWeb3()

  return (
    <div className="min-h-screen bg-black pt-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-md mx-auto"
        >
          <div className="flex items-center gap-4 mb-8">
            <Link href="/" className="text-white hover:text-gray-300">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-3xl font-bold text-white">Login</h1>
          </div>
          
          <div className="bg-gray-900 p-8 rounded-lg text-center">
            <Wallet size={48} className="text-blue-400 mx-auto mb-6" />
            
            {!isConnected ? (
              <div>
                <h2 className="text-xl font-semibold text-white mb-4">
                  Connect Your Wallet
                </h2>
                <p className="text-gray-400 mb-6">
                  Connect your MetaMask wallet to access Block-MEET
                </p>
                <button
                  onClick={connectWallet}
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
                >
                  Connect MetaMask
                </button>
              </div>
            ) : (
              <div>
                <h2 className="text-xl font-semibold text-white mb-4">
                  Wallet Connected
                </h2>
                <p className="text-gray-400 mb-2">Connected Account:</p>
                <p className="text-blue-400 font-mono text-sm mb-6 break-all">
                  {account}
                </p>
                <button
                  onClick={disconnectWallet}
                  className="w-full bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-200"
                >
                  Disconnect Wallet
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}