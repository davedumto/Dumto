import '../src/index.css'
import { MotionProvider } from '../src/components/MotionProvider'
import { Toaster } from 'sonner'

export const metadata = {
  title: 'David Ejere, Leadership Expert & Public Speaker',
  description: 'Software developer turned leadership expert helping professionals unlock their potential. Get proven strategies for career transformation and leadership development through speaking events and workshops.',
  keywords: 'David Ejere, leadership expert, public speaker, career transformation, professional development, software developer, leadership training, speaking events',
  author: 'David Ejere',
  openGraph: {
    title: 'David Ejere, Leadership Expert & Public Speaker',
    description: 'Transform your career with proven leadership strategies from a software developer turned expert speaker.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'David Ejere, Leadership Expert & Public Speaker',
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
      <body className="min-h-screen overflow-x-hidden bg-paper font-sans text-ink antialiased">
        <MotionProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: 'var(--surface)',
                color: 'var(--ink)',
                border: '2px solid var(--ink)',
                borderRadius: '16px',
                boxShadow: '6px 6px 0 0 var(--blue)',
                fontFamily: 'inherit',
              },
            }}
          />
        </MotionProvider>
      </body>
    </html>
  )
}
