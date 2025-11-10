import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Footer } from '@/components/layout/footer'
import { Navbar } from '@/components/layout/navbar'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { QueryProviders } from '../providers/queryProvider'
import { AuthProvider } from '@/providers/AuthProvider'
import { getServerMe } from '@/lib/server/me'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Event Platform',
  description: 'Discover and manage events',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const me = await getServerMe()
  return (
    <html lang="en" className="dark" style={{ colorScheme: 'dark' }}>
      <body className={inter.className}>
        <ThemeProvider >
         <QueryProviders>
           <AuthProvider initialUser={me}>
            <div className="min-h-screen flex flex-col">
             <Navbar />
             <main className="flex-1">
               {children}
             </main>
             <Footer />
           </div>
           </AuthProvider>
        </QueryProviders>
        </ThemeProvider>
      </body>
    </html>
  )
}