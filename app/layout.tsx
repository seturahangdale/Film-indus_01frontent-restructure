import React from "react"
import type { Metadata, Viewport } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { NavbarWrapper } from "@/components/navbar-wrapper"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
})

export const metadata: Metadata = {
  title: "Film Industry MP",
  description: "Premium filming destination in Madhya Pradesh",
  keywords: [
    "MP Line Production Website",
    "MP Line Production work",
    "Madhya Pradesh Line Production Website",
    "MP Line Producer",
    "MP Film Support",
    "Film Support in MP",
    "Line Producer in MP",
    "Line Production in Indore",
    "Line Producer in Indore",
    "Film Production in Indore",
    "Film Production in MP",
    "Production House in MP",
    "Film Production house in Indore",
    "Film Production house in MP",
    "Production house in Indore"
  ],
  generator: 'v0.app'
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

import { Toaster } from 'sonner'
import { FloatingButtons } from "@/components/floating-buttons"
import { ThemeProvider } from "@/components/theme-provider"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="font-body antialiased text-foreground bg-background transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {/* Global Navbar Wrapper - handles visibility on admin pages */}
          <NavbarWrapper />

          {/* Page content with proper z-indexing */}
          <main className="relative">
            {children}
          </main>

          <FloatingButtons />
          <Toaster position="top-right" richColors />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
