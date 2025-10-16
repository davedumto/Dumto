import '../src/index.css'
import { ThemeProvider } from '../src/contexts/ThemeContext'
import { Toaster } from 'sonner'

export const metadata = {
  title: 'David Ejere - Leadership Expert & Public Speaker',
  description: 'Software developer turned leadership expert helping professionals unlock their potential. Get proven strategies for career transformation and leadership development through speaking events and workshops.',
  keywords: 'David Ejere, leadership expert, public speaker, career transformation, professional development, software developer, leadership training, speaking events',
  author: 'David Ejere',
  openGraph: {
    title: 'David Ejere - Leadership Expert & Public Speaker',
    description: 'Transform your career with proven leadership strategies from a software developer turned expert speaker.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'David Ejere - Leadership Expert & Public Speaker',
    description: 'Transform your career with proven leadership strategies from a software developer turned expert speaker.',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300 overflow-x-hidden">
        <ThemeProvider>
          {children}
          <Toaster 
            position="top-right" 
            richColors 
            theme="system"
            toastOptions={{
              style: {
                background: 'hsl(var(--background))',
                color: 'hsl(var(--foreground))',
                border: '1px solid hsl(var(--border))',
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  )
}