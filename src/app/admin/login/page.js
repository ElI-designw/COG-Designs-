'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { siteConfig } from '@/config/siteConfig'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    setLoading(false)

    if (res?.error) {
      setError('Invalid email or password.')
    } else {
      router.push('/admin/dashboard')
      router.refresh()
    }
  }

  const inputClass =
    'w-full bg-bg-secondary border border-bg-border text-white font-inter text-sm px-4 py-3 rounded-xl outline-none transition-all duration-200 focus:border-accent-purple/70 focus:shadow-[0_0_0_2px_rgba(59,130,246,0.15)] placeholder:text-text-secondary/50'

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 40%, rgba(59,130,246,0.12) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 w-full max-w-md">
        {/* Brand */}
        <div className="text-center mb-10">
          <h1 className="font-bebas text-5xl tracking-widest gradient-text">{siteConfig.name}</h1>
          <p className="font-montserrat text-xs uppercase tracking-[0.3em] text-text-secondary mt-1">
            Admin Panel
          </p>
        </div>

        {/* Card */}
        <div className="bg-bg-secondary border border-bg-border rounded-2xl p-8 relative gradient-border">
          <h2 className="font-montserrat font-semibold text-white text-lg mb-6">Sign In</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="font-montserrat text-xs uppercase tracking-widest text-text-secondary mb-1.5 block">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@email.com"
                required
                className={inputClass}
                autoComplete="email"
              />
            </div>

            <div>
              <label className="font-montserrat text-xs uppercase tracking-widest text-text-secondary mb-1.5 block">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className={inputClass}
                autoComplete="current-password"
              />
            </div>

            {error && (
              <p className="font-inter text-sm text-accent-pink bg-accent-pink/10 border border-accent-pink/20 rounded-lg px-4 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-gradient text-white font-montserrat font-semibold px-8 py-3.5 rounded-full text-sm w-full mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In →'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
