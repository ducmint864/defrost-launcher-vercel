'use client'

import Whitelist from './whitelist';
import { SessionProvider } from 'next-auth/react'

export default function WhitelistPage() {
  return (
    <SessionProvider>
      <Whitelist projectID="1" />
    </SessionProvider>
  )
}