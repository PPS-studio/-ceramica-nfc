import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Un mensaje para ti',
  description: 'Tu cerámica te habla',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
