'use client'

import { fetcher } from '@/helpers/fetcher'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getToken } from '@/helpers/tokenManager'

export default function LoginLayout({ children }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const reqAuth = async () => {
      if (!getToken()) {
        setIsLoading(false)
        return
      }

      try {
        await fetcher.get('/verify')
        router.push('/admin')
      } catch (err) {
        setIsLoading(false)
      }
    }
    reqAuth()
  }, [])

  return <>{isLoading ? 'Loading...' : children}</>
}
