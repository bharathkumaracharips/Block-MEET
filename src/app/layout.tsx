import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Web3Provider } from '@/contexts/Web3Context'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Block-MEET - Decentralized Video Conferencing',
  description: 'Revolutionize your meetings with blockchain-powered security',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Web3Provider>
          {children}
        </Web3Provider>
      </body>
    </html>
  )
}