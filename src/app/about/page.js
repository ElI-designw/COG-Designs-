import Image from 'next/image'
import Link from 'next/link'
import { siteConfig } from '@/config/siteConfig'
import GlowHalos from '@/components/GlowHalos'
import { FadeUp, StaggerContainer, StaggerItem } from '@/components/MotionWrapper'

export const metadata = {
  title: 'About',
  description: `Learn about ${siteConfig.fullName} — creative graphic designer based in ${siteConfig.location}.`,
}

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-bg-primary overflow-hidden">
        <GlowHalos />
        <div className="relative z-10 text-center px-4">
          <span className="font-montserrat text-xs font-semibold uppercase tracking-[0.3em] text-text-secondary mb-4 block">
            The Creative
          </span>
          <h1 className="font-bebas text-[clamp(3.5rem,10vw,9rem)] leading-none tracking-widest gradient-text">
            About COG Designs
          </h1>
        </div>
      </section>

      {/* Bio — light */}
      <section className="bg-bg-light py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Profile photo */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative">
                {/* Gradient ring border */}
                <div
                  className="w-72 h-72 sm:w-80 sm:h-80 rounded-full p-1"
                  style={{ background: 'linear-gradient(135deg, #7C3AED, #EC4899, #F97316)' }}
                >
                  <div className="w-full h-full rounded-full bg-bg-secondary overflow-hidden relative">
                    {/* Replace /public/profile.jpg with your photo */}
                    <Image
                      src="https://picsum.photos/seed/profile/400/400"
                      alt={siteConfig.fullName}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 288px, 320px"
                    />
                  </div>
                </div>
                {/* Glow decoration */}
                <div
                  className="absolute -inset-4 rounded-full -z-10"
                  style={{
                    background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)',
                    filter: 'blur(40px)',
                  }}
                />
              </div>
            </div>

            {/* Bio text */}
            <div className="space-y-6">
              <div>
                <h2 className="font-bebas text-5xl tracking-widest gradient-text">{siteConfig.fullName}</h2>
                <p className="font-montserrat font-semibold text-text-dark/60 text-sm uppercase tracking-widest mt-1">
                  Creative Designer · {siteConfig.location}
                </p>
              </div>
              <p className="font-inter text-text-dark leading-relaxed text-base">{siteConfig.bio}</p>
              <div className="flex gap-4 pt-2">
                <Link
                  href="/work"
                  className="btn-gradient text-white font-montserrat font-semibold px-6 py-3 rounded-full text-sm"
                >
                  View My Work
                </Link>
                <Link
                  href="/contact"
                  className="btn-outline-gradient font-montserrat font-semibold px-6 py-3 rounded-full text-sm"
                >
                  <span className="gradient-text">Get In Touch</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools — dark */}
      <section className="bg-bg-primary py-24 px-4 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 30% 50%, rgba(34,211,238,0.07) 0%, transparent 60%)',
          }}
        />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-14">
            <span className="font-montserrat text-xs font-semibold uppercase tracking-[0.3em] text-text-secondary mb-3 block">
              Toolkit
            </span>
            <h2 className="font-bebas text-[clamp(3rem,7vw,6rem)] tracking-widest gradient-text">
              My Tools
            </h2>
          </div>
          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {siteConfig.tools.map((tool) => (
              <StaggerItem key={tool.name}>
                <div className="bg-bg-card border border-bg-border rounded-xl p-4 text-center group hover:border-accent-purple/50 transition-all duration-300 card-hover">
                  <span className="font-bebas text-3xl gradient-text block">{tool.icon}</span>
                  <span className="font-montserrat text-xs text-text-secondary mt-2 block leading-tight">
                    {tool.name}
                  </span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Services — light */}
      <section className="bg-bg-light py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="font-montserrat text-xs font-semibold uppercase tracking-[0.3em] text-text-dark/50 mb-3 block">
              Expertise
            </span>
            <h2 className="font-bebas text-[clamp(3rem,7vw,6rem)] tracking-widest gradient-text">
              What I Offer
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {siteConfig.categories.map((cat, i) => (
              <div
                key={cat.slug}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex gap-5 group hover:shadow-md transition-all duration-300"
              >
                <div className="font-bebas text-4xl gradient-text flex-shrink-0 mt-1">{cat.icon}</div>
                <div>
                  <h3 className="font-montserrat font-bold text-text-dark text-base mb-2">{cat.name}</h3>
                  <p className="font-inter text-text-dark/60 text-sm leading-relaxed">{cat.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — dark */}
      <section className="bg-bg-primary py-28 px-4 relative overflow-hidden">
        <GlowHalos />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="font-bebas text-[clamp(3rem,8vw,7rem)] leading-none tracking-widest gradient-text mb-4">
            Let&apos;s Create Together
          </h2>
          <p className="font-inter text-text-secondary text-lg mb-10">
            Ready to bring your vision to life? Let&apos;s start the conversation.
          </p>
          <Link
            href="/contact"
            className="btn-gradient text-white font-montserrat font-semibold px-10 py-4 rounded-full text-base inline-block"
          >
            Get In Touch
          </Link>
        </div>
      </section>
    </>
  )
}
