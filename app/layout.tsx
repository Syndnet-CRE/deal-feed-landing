import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { WaitlistProvider } from '@/components/waitlist-context'
import { WaitlistModal } from '@/components/waitlist-modal'

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  title: 'Nightdrop: Off-Market Deals, Every Morning',
  description: 'Submit your buy box once. Get a curated digest of matched off-market properties in your inbox every morning, scored, written up, with owner contact attached.',
  icons: {
    icon: '/logos/nightdrop-logo.png',
    apple: '/logos/nightdrop-logo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased">
        <WaitlistProvider>
          {children}
          <WaitlistModal />
        </WaitlistProvider>
      </body>
    </html>
  )
}
