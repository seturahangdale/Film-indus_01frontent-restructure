'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { User, Lock, Eye, EyeOff, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'

function ResetPasswordForm() {
    const [tokenType, setTokenType] = useState<'password_reset' | 'username_reset' | null>(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isVerifying, setIsVerifying] = useState(true)
    const [isSuccess, setIsSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const searchParams = useSearchParams()
    const token = searchParams.get('token')
    const router = useRouter()

    useEffect(() => {
        const verifyToken = async () => {
            if (!token) {
                setIsVerifying(false)
                return
            }

            try {
                const response = await fetch('/api/auth/verify-token', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ token }),
                })
                const data = await response.json()
                if (data.success) {
                    setTokenType(data.type)
                } else {
                    setError(data.error || 'Invalid or expired link')
                }
            } catch (err) {
                setError('Failed to verify security token')
            } finally {
                setIsVerifying(false)
            }
        }
        verifyToken()
    }, [token])

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!token) {
            toast.error('Invalid session')
            return
        }

        if (tokenType === 'password_reset' && password !== confirmPassword) {
            toast.error('Passwords do not match')
            return
        }

        setIsLoading(true)

        try {
            const response = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, password, username }),
            })

            const data = await response.json()

            if (data.success) {
                setIsSuccess(true)
                toast.success(data.message)
                setTimeout(() => router.push('/login'), 3000)
            } else {
                toast.error(data.error || 'Failed to update account')
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    if (isVerifying) {
        return (
            <div className="flex flex-col items-center justify-center p-12 bg-[#121212] border border-white/10 rounded-3xl shadow-2xl">
                <Loader2 className="animate-spin text-amber-500 mb-4" size={32} />
                <p className="text-zinc-400 font-bold uppercase tracking-widest text-xs">Establishing Secure Link...</p>
            </div>
        )
    }

    if (error || !token) {
        return (
            <div className="bg-[#121212] border border-white/10 rounded-3xl p-10 shadow-2xl text-center max-w-md w-full mx-4 relative z-10">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertCircle className="text-red-500" size={32} />
                </div>
                <h1 className="text-2xl font-display font-bold text-white mb-4">Link Error</h1>
                <p className="text-zinc-400 mb-8">
                    {error || 'This account recovery link is invalid or has expired. Please request a new one.'}
                </p>
                <button
                    onClick={() => router.push('/login')}
                    className="text-amber-500 hover:text-amber-400 font-bold transition-colors uppercase tracking-widest text-sm"
                >
                    Return to Login
                </button>
            </div>
        )
    }

    if (isSuccess) {
        return (
            <div className="bg-[#121212] border border-white/10 rounded-3xl p-10 shadow-2xl text-center max-w-md w-full mx-4 relative z-10">
                <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="text-emerald-500" size={40} />
                </div>
                <h1 className="text-2xl font-display font-bold text-white mb-4">Account Updated</h1>
                <p className="text-zinc-400 mb-8">
                    Your {tokenType === 'password_reset' ? 'password' : 'username'} has been successfully updated. Redirecting to login...
                </p>
                <Loader2 className="animate-spin text-emerald-500 mx-auto" size={24} />
            </div>
        )
    }

    return (
        <div className="w-full max-w-md p-8 relative z-10 mx-4">
            <div className="bg-[#121212] border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
                <div className="flex flex-col items-center mb-8">
                    <h1 className="text-2xl font-display font-bold text-white tracking-widest uppercase text-center">
                        {tokenType === 'password_reset' ? 'Reset Password' : 'Update Username'}
                    </h1>
                    <p className="text-zinc-500 text-sm mt-2 tracking-wide text-center">
                        Securely manage your administrative credentials
                    </p>
                </div>

                <form onSubmit={handleReset} className="space-y-6">
                    {tokenType === 'username_reset' ? (
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest ml-1">
                                New Username
                            </label>
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
                                    placeholder="Enter new username"
                                />
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest ml-1">
                                    New Password
                                </label>
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
                                        placeholder="Enter new password"
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

                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest ml-1">
                                    Confirm New Password
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-amber-600 transition-colors">
                                        <Lock size={18} />
                                    </div>
                                    <input
                                        type="password"
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-amber-600/20 focus:border-amber-600/50 transition-all duration-300"
                                        placeholder="Confirm new password"
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    <button
                        disabled={isLoading}
                        type="submit"
                        className="w-full bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-white font-bold py-4 rounded-2xl shadow-[0_10px_20px_rgba(212,165,116,0.2)] transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                        {isLoading ? (
                            <Loader2 className="animate-spin" size={20} />
                        ) : (
                            tokenType === 'username_reset' ? 'Update Username' : 'Reset Password'
                        )}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default function ResetPasswordPage() {
    return (
        <div className="min-h-screen w-full flex items-center justify-center relative bg-black overflow-hidden">
            {/* Cinematic Background - Simplified for visibility */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-900 opacity-80" />
            </div>

            <Suspense fallback={<Loader2 className="animate-spin text-amber-600" size={32} />}>
                <ResetPasswordForm />
            </Suspense>
        </div>
    )
}
