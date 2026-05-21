const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

const projects = [
  {
    title: 'Luminary Brand Identity',
    slug: 'luminary-brand-identity',
    category: 'Branding & Identity',
    tags: 'logo,brand,identity,typography',
    shortDescription: 'Complete brand identity system for a luxury lifestyle brand, featuring a refined wordmark, custom typeface pairings, and a sophisticated color palette.',
    fullDescription: 'Luminary approached COG Designs with a vision to position themselves as the premier luxury lifestyle destination in East Africa. The challenge was to create a visual identity that communicated exclusivity without alienating their target demographic. The result is a refined system built around a custom wordmark, bespoke typeface pairings, and a palette of deep gold, ivory, and midnight navy that speaks directly to the aspirations of their clientele.',
    year: 2024,
    client: 'Luminary Lifestyle',
    featured: true,
    published: true,
    order: 1,
    images: [
      { url: 'https://picsum.photos/seed/luminary1/1200/800', altText: 'Luminary brand identity overview', order: 0 },
      { url: 'https://picsum.photos/seed/luminary2/1200/800', altText: 'Luminary logo variations', order: 1 },
      { url: 'https://picsum.photos/seed/luminary3/1200/800', altText: 'Luminary brand collateral', order: 2 },
    ],
  },
  {
    title: 'Zeal Coffee Rebrand',
    slug: 'zeal-coffee-rebrand',
    category: 'Branding & Identity',
    tags: 'rebrand,logo,coffee,packaging',
    shortDescription: 'Strategic rebrand for a Kampala coffee chain aiming to compete in the specialty coffee market with a bold, modern identity.',
    fullDescription: 'Zeal Coffee needed to shed their dated visual identity and position themselves alongside international specialty coffee brands. The rebrand involved a complete overhaul — from logo design and brand guidelines to menu design and environmental graphics. The new identity embraces the vibrancy of Ugandan coffee culture while projecting the contemporary quality that urban coffee enthusiasts expect.',
    year: 2024,
    client: 'Zeal Coffee',
    featured: true,
    published: true,
    order: 2,
    images: [
      { url: 'https://picsum.photos/seed/zeal1/1200/800', altText: 'Zeal Coffee new brand identity', order: 0 },
      { url: 'https://picsum.photos/seed/zeal2/1200/800', altText: 'Zeal Coffee packaging design', order: 1 },
      { url: 'https://picsum.photos/seed/zeal3/1200/800', altText: 'Zeal Coffee brand in context', order: 2 },
    ],
  },
  {
    title: 'Harvest Packaging Collection',
    slug: 'harvest-packaging-collection',
    category: 'Print & Packaging',
    tags: 'packaging,print,organic,label',
    shortDescription: 'Artisan packaging design for an organic foods brand — earthy textures, hand-drawn illustrations, and premium matte finishes.',
    fullDescription: 'Harvest Foods required packaging that communicated their commitment to organic, locally sourced ingredients without resorting to clichéd green-and-brown aesthetics. The solution was a collection of packaging designs anchored by hand-drawn botanical illustrations, textured kraft paper backgrounds, and a warm, earthy color palette. Each product line received its own distinct illustration while maintaining a cohesive family aesthetic.',
    year: 2023,
    client: 'Harvest Organic Foods',
    featured: true,
    published: true,
    order: 3,
    images: [
      { url: 'https://picsum.photos/seed/harvest1/1200/800', altText: 'Harvest packaging collection overview', order: 0 },
      { url: 'https://picsum.photos/seed/harvest2/1200/800', altText: 'Harvest individual package detail', order: 1 },
      { url: 'https://picsum.photos/seed/harvest3/1200/800', altText: 'Harvest packaging on shelf', order: 2 },
    ],
  },
  {
    title: 'Pinnacle Annual Report',
    slug: 'pinnacle-annual-report',
    category: 'Print & Packaging',
    tags: 'print,annual-report,corporate,infographic',
    shortDescription: 'Award-winning annual report design for a financial institution — transforming complex data into compelling visual narratives.',
    fullDescription: 'Pinnacle Finance Group needed their 2023 Annual Report to communicate record growth to both institutional investors and the wider public. The design challenge was translating dense financial data into an engaging visual story. Through custom infographics, bold typography, and a structured grid system, the resulting 80-page report conveys confidence and transparency while remaining approachable.',
    year: 2023,
    client: 'Pinnacle Finance Group',
    featured: false,
    published: true,
    order: 4,
    images: [
      { url: 'https://picsum.photos/seed/pinnacle1/1200/800', altText: 'Pinnacle annual report cover', order: 0 },
      { url: 'https://picsum.photos/seed/pinnacle2/1200/800', altText: 'Pinnacle report spreads', order: 1 },
    ],
  },
  {
    title: 'Neon Glow Brand Campaign',
    slug: 'neon-glow-brand-campaign',
    category: 'Motion & Video',
    tags: 'motion,animation,brand,campaign',
    shortDescription: 'High-energy animated brand campaign for a lifestyle energy drink — bold motion graphics and kinetic typography.',
    fullDescription: 'Neon Energy commissioned a full motion campaign package for their product launch across social media and digital advertising platforms. The brief demanded high energy, visual impact, and unmistakable brand recall. The result was a suite of animated assets ranging from 6-second bumper ads to 30-second hero spots, all unified by kinetic typography, vibrant neon color grades, and rhythmic motion choreographed to custom sound design.',
    year: 2024,
    client: 'Neon Energy Co.',
    featured: true,
    published: true,
    order: 5,
    images: [
      { url: 'https://picsum.photos/seed/neon1/1200/800', altText: 'Neon campaign motion stills', order: 0 },
      { url: 'https://picsum.photos/seed/neon2/1200/800', altText: 'Neon campaign keyframes', order: 1 },
      { url: 'https://picsum.photos/seed/neon3/1200/800', altText: 'Neon campaign deliverables', order: 2 },
    ],
  },
  {
    title: 'Artisan Festival Promo',
    slug: 'artisan-festival-promo',
    category: 'Motion & Video',
    tags: 'video,promo,event,festival',
    shortDescription: 'Promotional video production and motion graphics package for Kampala\'s premier artisan market festival.',
    fullDescription: 'The Kampala Artisan Festival needed a promotional video that captured the vibrant energy of their annual showcase while positioning the event as a premium cultural experience. The production included on-site filming coordination direction, custom motion graphics package, title sequences, and a suite of social media cut-downs. The final deliverables drove a 40% increase in advance ticket sales compared to the previous year.',
    year: 2024,
    client: 'Kampala Artisan Festival',
    featured: false,
    published: true,
    order: 6,
    images: [
      { url: 'https://picsum.photos/seed/artisan1/1200/800', altText: 'Artisan festival promo stills', order: 0 },
      { url: 'https://picsum.photos/seed/artisan2/1200/800', altText: 'Artisan festival motion graphics', order: 1 },
    ],
  },
  {
    title: 'Pulse Social Media Kit',
    slug: 'pulse-social-media-kit',
    category: 'Social Media Design',
    tags: 'social-media,instagram,content,templates',
    shortDescription: 'Comprehensive social media design system for a fitness brand — templates, stories, carousels, and highlight covers.',
    fullDescription: 'Pulse Fitness was struggling with inconsistent social media visuals that undermined their premium positioning. COG Designs developed a comprehensive social media design system — a library of modular templates for feed posts, stories, carousels, and highlight covers — all built in a high-energy aesthetic featuring bold typography, gradient overlays, and dynamic compositional layouts. The system enabled their in-house team to create consistent, on-brand content independently.',
    year: 2025,
    client: 'Pulse Fitness',
    featured: true,
    published: true,
    order: 7,
    images: [
      { url: 'https://picsum.photos/seed/pulse1/1200/800', altText: 'Pulse social media kit overview', order: 0 },
      { url: 'https://picsum.photos/seed/pulse2/1200/800', altText: 'Pulse Instagram templates', order: 1 },
      { url: 'https://picsum.photos/seed/pulse3/1200/800', altText: 'Pulse stories and highlights', order: 2 },
    ],
  },
  {
    title: 'Vibe Music Festival Content',
    slug: 'vibe-music-festival-content',
    category: 'Social Media Design',
    tags: 'social-media,music,festival,event',
    shortDescription: 'Event social media campaign for a major Ugandan music festival — announcements, countdown graphics, and live event coverage templates.',
    fullDescription: 'VIBE Music Festival needed a social media campaign that could build anticipation over a 3-month lead-up period and sustain engagement through the live event weekend. The campaign included phased announcement graphics, artist spotlight templates, countdown posts, behind-the-scenes story templates, and real-time event coverage assets. The visual language drew on retro rave aesthetics filtered through a contemporary African lens.',
    year: 2025,
    client: 'VIBE Music Festival',
    featured: false,
    published: true,
    order: 8,
    images: [
      { url: 'https://picsum.photos/seed/vibe1/1200/800', altText: 'VIBE festival social campaign', order: 0 },
      { url: 'https://picsum.photos/seed/vibe2/1200/800', altText: 'VIBE festival announcement graphics', order: 1 },
    ],
  },
]

async function main() {
  console.log('🌱 Seeding database...')

  // Create admin user
  const hashedPassword = await bcrypt.hash('cogdesigns2025', 12)
  await prisma.user.upsert({
    where: { email: 'matteelijah8@gmail.com' },
    update: {},
    create: {
      email: 'matteelijah8@gmail.com',
      password: hashedPassword,
    },
  })
  console.log('✅ Admin user created')

  // Create projects
  for (const project of projects) {
    const { images, ...projectData } = project
    const created = await prisma.project.upsert({
      where: { slug: project.slug },
      update: {},
      create: {
        ...projectData,
        images: {
          create: images,
        },
      },
    })
    console.log(`✅ Project created: ${created.title}`)
  }

  console.log('🎉 Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
