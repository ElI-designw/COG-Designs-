'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sending, setSending] = useState(false)

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all required fields.')
      return
    }
    setSending(true)
    // Simulate sending — replace with your email service (Resend, SendGrid, etc.)
    await new Promise((r) => setTimeout(r, 1200))
    toast.success("Message sent! I'll be in touch soon.")
    setForm({ name: '', email: '', subject: '', message: '' })
    setSending(false)
  }

  const inputClass =
    'w-full bg-bg-card border border-bg-border text-white font-inter text-sm px-4 py-3 rounded-xl outline-none transition-all duration-200 focus:border-accent-purple/70 focus:shadow-[0_0_0_2px_rgba(59,130,246,0.15)] placeholder:text-text-secondary/50'

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="font-montserrat text-xs uppercase tracking-widest text-text-secondary mb-1.5 block">
            Name <span className="text-accent-pink">*</span>
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            required
            className={inputClass}
          />
        </div>
        <div>
          <label className="font-montserrat text-xs uppercase tracking-widest text-text-secondary mb-1.5 block">
            Email <span className="text-accent-pink">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="your@email.com"
            required
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="font-montserrat text-xs uppercase tracking-widest text-text-secondary mb-1.5 block">
          Subject
        </label>
        <input
          name="subject"
          value={form.subject}
          onChange={handleChange}
          placeholder="Project inquiry, collaboration..."
          className={inputClass}
        />
      </div>

      <div>
        <label className="font-montserrat text-xs uppercase tracking-widest text-text-secondary mb-1.5 block">
          Message <span className="text-accent-pink">*</span>
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Tell me about your project..."
          required
          rows={6}
          className={`${inputClass} resize-none`}
        />
      </div>

      <button
        type="submit"
        disabled={sending}
        className="btn-gradient text-white font-montserrat font-semibold px-8 py-3.5 rounded-full text-sm tracking-wide w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {sending ? 'Sending...' : 'Send Message →'}
      </button>
    </form>
  )
}
