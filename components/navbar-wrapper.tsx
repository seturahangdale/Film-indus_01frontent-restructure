'use client'

import { usePathname } from 'next/navigation'
import { Navbar } from '@/components/navbar'

export function NavbarWrapper() {
    const pathname = usePathname()
    const isAuthPage = pathname?.startsWith('/admin') || pathname === '/login' || pathname === '/reset-password'

    if (isAuthPage) return null

    return <Navbar />
}
