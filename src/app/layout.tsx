import type { Metadata } from 'next'
import Header from '@/components/Header'
import { ScrollArea } from '@/components/ui/scroll-area'
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
    <html lang="en" className="light" style={{ colorScheme: 'light' }}>
      <body>
        <Providers
          attribute="class"
          defaultTheme="system"
        >
          <Header />
          <main className="pt-14 h-screen">
            <ScrollArea className="h-full">
              {children}
            </ScrollArea>
          </main>
        </Providers>
      </body>
    </html>
  )
}
