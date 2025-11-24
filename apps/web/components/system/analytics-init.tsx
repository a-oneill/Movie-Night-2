'use client'
import { useEffect } from 'react'
import { initSentry } from '@/lib/monitoring/sentry'

export default function AnalyticsInit() {
  useEffect(() => {
    initSentry()
  }, [])
  return null
}