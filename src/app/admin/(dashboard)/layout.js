'use client'

import { fetcher } from '@/helpers/fetcher'
import { useEffect, useState } from 'react'
import { NavbarNested } from '@/components/admin/NavbarNested/NavbarNested'
import { getToken, clearToken } from '@/helpers/tokenManager'

export default function DashboardLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const reqAuth = async () => {
      if (!getToken()) {
        return
      }

      try {
        await fetcher.get('/verify')
        setIsLoading(false)
      } catch (err) {
        clearToken()
        location.replace('/admin/login')
      }
    }
    reqAuth()
  }, [])

  return (
    <>
      {isLoading ? (
        'Loading...'
      ) : (
        <div className="flex">
          <div className="fixed">
            <NavbarNested />
          </div>
          <div className="overflow-auto ml-[rem(300px)] w-[calc(100%-rem(300px))] p-4">
            {children}
          </div>
        </div>
      )}
    </>
  )
}
