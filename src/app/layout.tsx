import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'nextjs-app-template',
  description: 'A template for create nextjs app project',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
