import type { Metadata } from 'next'
import Header from '@/components/Header'
import { Providers } from './providers'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI with MCP',
  description: 'Enabling the future with AI and MCP.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <Providers
          attribute="class"
          defaultTheme="system"
        >
          <Header />
          <main>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}
