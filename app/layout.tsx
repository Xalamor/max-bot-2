import type { Metadata } from 'next'
import { ReactNode } from 'react'
import StoreProvider from '@/lib/store/Provider'
import './globals.css'

export const metadata: Metadata = {
  title: 'University Schedule Bot',
  description: 'Расписание университета для Max бота',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="ru">
      <body style={{ margin: 0, padding: 0, fontFamily: 'Arial, sans-serif' }}>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  )
}