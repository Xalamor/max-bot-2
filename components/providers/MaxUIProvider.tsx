'use client'

import { ReactNode } from 'react'
import { MaxUI } from '@maxhub/max-ui'
import '@maxhub/max-ui/dist/styles.css'

export default function MaxUIProvider({
  children
}: {
  children: ReactNode
}) {
  return (
    <MaxUI>
      {children}
    </MaxUI>
  )
}