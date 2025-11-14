import React from 'react'
import AnalyticsInit from '@/components/system/analytics-init'
import { Navbar } from '@/components/layout/navbar'
import './globals.css'

export const metadata = {
  title: 'Movie Night',
  description: 'Discover your next favorite movie',
}

export default function RootLayout({ children }: { children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className="antialiased min-h-screen">
        <AnalyticsInit />
        <Navbar />
        <main className="container mx-auto px-6 py-12 lg:px-8">
          {children}
        </main>
      </body>
    </html>
  )
}