import { siteConfig } from '@/config/siteConfig'
import GlowHalos from '@/components/GlowHalos'
import ContactForm from './ContactForm'

export const metadata = {
  title: 'Contact',
  description: `Get in touch with ${siteConfig.fullName} — ${siteConfig.name}. Let's create something extraordinary together.`,
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  )
}

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-bg-primary overflow-hidden">
        <GlowHalos />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <span className="font-montserrat text-xs font-semibold uppercase tracking-[0.3em] text-text-secondary mb-4 block">
            Say Hello
          </span>
          <h1 className="font-bebas text-[clamp(2.5rem,9vw,8rem)] leading-none tracking-widest gradient-text">
            Let&apos;s Create Something Extraordinary
          </h1>
        </div>
      </section>

      {/* Contact body */}
      <section className="bg-bg-primary pb-24 px-4">
        <div className="max-w-6xl mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Form */}
            <div>
              <h2 className="font-bebas text-3xl tracking-widest gradient-text mb-8">Send a Message</h2>
              <ContactForm />
            </div>

            {/* Gradient divider on desktop */}
            <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent-purple/40 to-transparent" />

            {/* Contact details */}
            <div className="lg:pl-8">
              <h2 className="font-bebas text-3xl tracking-widest gradient-text mb-8">Contact Details</h2>

              <div className="space-y-6">
                <div>
                  <p className="font-montserrat text-xs uppercase tracking-widest text-text-secondary mb-1">Email</p>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="font-inter text-white hover:gradient-text transition-all duration-200"
                  >
                    {siteConfig.email}
                  </a>
                </div>

                <div>
                  <p className="font-montserrat text-xs uppercase tracking-widest text-text-secondary mb-1">Location</p>
                  <p className="font-inter text-white">{siteConfig.location}</p>
                </div>

                <div>
                  <p className="font-montserrat text-xs uppercase tracking-widest text-text-secondary mb-4">Follow Along</p>
                  <div className="space-y-3">
                    {/* Instagram — active */}
                    <a
                      href={siteConfig.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-white hover:text-accent-purple transition-colors duration-200 group"
                    >
                      <span className="w-8 h-8 bg-bg-card border border-bg-border rounded-full flex items-center justify-center group-hover:border-accent-purple/50 transition-colors">
                        <InstagramIcon />
                      </span>
                      <span className="font-inter text-sm">Instagram</span>
                    </a>

                    {/* Coming soon platforms */}
                    {['Behance', 'LinkedIn', 'Dribbble'].map((platform) => (
                      <div key={platform} className="flex items-center gap-3 opacity-40 cursor-not-allowed">
                        <span className="w-8 h-8 bg-bg-card border border-bg-border rounded-full flex items-center justify-center">
                          <span className="text-text-secondary text-xs font-bold">
                            {platform[0]}
                          </span>
                        </span>
                        <span className="font-inter text-sm text-text-secondary">
                          {platform}{' '}
                          <span className="text-xs italic">— Coming Soon</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
