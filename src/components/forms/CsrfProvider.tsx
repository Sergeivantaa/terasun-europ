'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { CSRF_URL } from '@/lib/constants'

const CsrfContext = createContext<string>('')
export const useCsrf = () => useContext(CsrfContext)

export default function CsrfProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState('')

  useEffect(() => {
    fetch(CSRF_URL, { credentials: 'include' })
      .then(r => r.json())
      .then(d => setToken(d.token ?? d.csrf_token ?? ''))
      .catch(() => {})
  }, [])

  return <CsrfContext.Provider value={token}>{children}</CsrfContext.Provider>
}
