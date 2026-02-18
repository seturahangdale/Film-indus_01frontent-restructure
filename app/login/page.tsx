'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, User, Eye, EyeOff, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import Image from 'next/image'

export default function LoginPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [resetEmail, setResetEmail] = useState('')
    const [isForgotPassword, setIsForgotPassword] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [isForgotUsername, setIsForgotUsername] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            })

            const data = await response.json()

            if (data.success) {
                toast.success('Welcome back, Admin!')
                router.push('/admin')
            } else {
                toast.error(data.message || 'Invalid credentials')
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    const handleForgotRequest = async (e: React.FormEvent, type: 'password' | 'username') => {
        e.preventDefault()
        setIsLoading(true)

        const endpoint = type === 'password' ? '/api/auth/forgot-password' : '/api/auth/forgot-username'

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: resetEmail }),
            })

            const data = await response.json()

            if (data.success) {
                toast.success(data.message)
                setIsForgotPassword(false)
                setIsForgotUsername(false)
            } else {
                toast.error(data.error || `Failed to process ${type} request`)
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center relative bg-black overflow-hidden">
            {/* Cinematic Background - Simplified for visibility */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-900 opacity-80" />
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-600/30 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-600/30 to-transparent" />

            {/* Login/Reset Card */}
            <div className="w-full max-w-md p-8 relative z-10 mx-4">
                <div className="bg-[#121212] border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
                    {/* Subtle Glow */}
                    <div className="absolute -top-24 -left-24 w-48 h-48 bg-amber-600/5 rounded-full blur-3xl" />

                    <div className="flex flex-col items-center mb-10">
                        <div className="mb-6">
                            <img
                                src="/logo.png"
                                alt="Logo"
                                className="h-20 w-auto object-contain"
                            />
                        </div>
                        <h1 className="text-2xl font-bold text-white tracking-widest uppercase text-center font-display">
                            {isForgotPassword ? 'Reset Access' : isForgotUsername ? 'Find Username' : 'Admin Portal'}
                        </h1>
                        <p className="text-zinc-500 text-sm mt-3 tracking-wide text-center max-w-[280px]">
                            {isForgotPassword
                                ? 'Enter email for a reset link'
                                : isForgotUsername
                                    ? 'Enter email to receive your username'
                                    : 'Secure access for authorized personnel only'}
                        </p>
                    </div>

                    {!isForgotPassword && !isForgotUsername ? (
                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="space-y-2">
                                <div className="flex justify-between items-center ml-1">
                                    <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">
                                        Username
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() => setIsForgotUsername(true)}
                                        className="text-[10px] font-bold text-zinc-500 hover:text-amber-600 uppercase tracking-tighter transition-colors"
                                    >
                                        Forgot?
                                    </button>
                                </div>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-amber-600 transition-colors">
                                        <User size={18} />
                                    </div>
                                    <input
                                        type="text"
                                        required
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-amber-600/20 focus:border-amber-600/50 transition-all duration-300"
                                        placeholder="Enter your username"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center ml-1">
                                    <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">
                                        Password
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() => setIsForgotPassword(true)}
                                        className="text-[10px] font-bold text-amber-600/80 hover:text-amber-500 uppercase tracking-tighter transition-colors"
                                    >
                                        Forgot?
                                    </button>
                                </div>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-amber-600 transition-colors">
                                        <Lock size={18} />
                                    </div>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-12 text-white placeholder:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-amber-600/20 focus:border-amber-600/50 transition-all duration-300"
                                        placeholder="Enter your password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-500 hover:text-white transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <button
                                disabled={isLoading}
                                type="submit"
                                className="w-full bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-white font-bold py-4 rounded-2xl shadow-[0_10px_20px_rgba(212,165,116,0.2)] transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
                            >
                                {isLoading ? (
                                    <Loader2 className="animate-spin" size={20} />
                                ) : (
                                    <>
                                        Establish Secure Session
                                        <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                                    </>
                                )}
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={(e) => handleForgotRequest(e, isForgotPassword ? 'password' : 'username')} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest ml-1">
                                    Email Address
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-amber-600 transition-colors">
                                        <User size={18} />
                                    </div>
                                    <input
                                        type="email"
                                        required
                                        value={resetEmail}
                                        onChange={(e) => setResetEmail(e.target.value)}
                                        className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-amber-600/20 focus:border-amber-600/50 transition-all duration-300"
                                        placeholder="Enter your email"
                                    />
                                </div>
                            </div>

                            <button
                                disabled={isLoading}
                                type="submit"
                                className="w-full bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-white font-bold py-4 rounded-2xl shadow-[0_10px_20px_rgba(212,165,116,0.2)] transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
                            >
                                {isLoading ? (
                                    <Loader2 className="animate-spin" size={20} />
                                ) : (
                                    isForgotPassword ? 'Send Reset Link' : 'Send My Username'
                                )}
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    setIsForgotPassword(false)
                                    setIsForgotUsername(false)
                                }}
                                className="w-full text-center text-xs text-zinc-500 hover:text-white transition-colors uppercase tracking-[0.2em] font-bold"
                            >
                                Back to Login
                            </button>
                        </form>
                    )}

                    <div className="mt-8 pt-6 border-t border-white/5 flex justify-center">
                        <p className="text-[10px] text-zinc-600 uppercase tracking-[0.2em]">
                            Madhya Pradesh Film Tourism Board
                        </p>
                    </div>
                </div>
            </div>

            {/* Background Glows */}
            <div className="absolute top-1/4 -right-1/4 w-[500px] h-[500px] bg-amber-900/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 -left-1/4 w-[500px] h-[500px] bg-zinc-900/20 rounded-full blur-[120px] pointer-events-none" />
        </div>
    )
}
