'use client'

import { ReactNode } from 'react'
import { Footer } from './footer'
import { FloatingButtons } from './floating-buttons'

interface LayoutWrapperProps {
  children: ReactNode
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Page Content */}
      <main className="flex-grow w-full">
        {children}
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating CTA Buttons */}
      <FloatingButtons />
    </div>
  )
}
