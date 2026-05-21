# COG Designs — Portfolio Website

Personal portfolio for **Matte Elijah Innocent** (COG Designs), built with Next.js 14, Tailwind CSS, Framer Motion, Prisma + SQLite, and NextAuth.

---

## Prerequisites

- **Node.js 18+** — Download from [nodejs.org](https://nodejs.org) (choose the LTS version)
- npm (comes with Node.js)

---

## Quick Setup

```bash
# 1. Navigate to the project
cd cog-designs

# 2. Install all dependencies
npm install

# 3. Generate Prisma client
npm run db:generate

# 4. Push schema to SQLite database
npm run db:push

# 5. Seed the database (8 sample projects + admin user)
npm run db:seed

# 6. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Admin Panel

- URL: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- Email: `matteelijah8@gmail.com`
- Password: `cogdesigns2025`

> Change the password after first login by updating the seed script and re-running it, or by directly updating the hashed password in the database via `npm run db:studio`.

---

## Project Structure

```
cog-designs/
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── seed.js             # Sample data seeder
├── public/
│   └── uploads/            # Uploaded images stored here
├── src/
│   ├── app/                # Next.js App Router pages
│   │   ├── page.js         # Home
│   │   ├── work/           # Portfolio grid
│   │   ├── project/[slug]/ # Project detail
│   │   ├── about/          # About page
│   │   ├── contact/        # Contact page
│   │   ├── admin/          # Admin panel
│   │   └── api/            # API routes
│   ├── components/         # Shared UI components
│   ├── config/
│   │   └── siteConfig.js   # ← All personal details live here
│   └── lib/
│       ├── prisma.js       # Prisma client singleton
│       └── auth.js         # Auth helpers
├── .env                    # Environment variables (local only)
└── .env.example            # Template for env vars
```

---

## Customisation

### Update Personal Details

All personal information is centralised in **`src/config/siteConfig.js`**:

```js
export const siteConfig = {
  name: 'COG Designs',
  fullName: 'Matte Elijah Innocent',
  email: 'matteelijah8@gmail.com',
  // ... edit anything here
}
```

### Replace Profile Photo

1. Add your photo as `public/profile.jpg`
2. In `src/app/about/page.js`, replace the `picsum.photos` URL in the `<Image>` component with `/profile.jpg`

### Add Social Links

In `siteConfig.js`, fill in the empty strings:

```js
social: {
  behance: 'https://behance.net/your-profile',
  linkedin: 'https://linkedin.com/in/your-profile',
  dribbble: 'https://dribbble.com/your-profile',
}
```

The Contact page and Footer will automatically show them as active links.

### Add Email Sending to Contact Form

In `src/app/contact/ContactForm.jsx`, replace the `setTimeout` simulation with a real email service (e.g. [Resend](https://resend.com), SendGrid):

```js
// Replace this:
await new Promise((r) => setTimeout(r, 1200))

// With your actual API call, e.g. Resend:
await fetch('/api/send-email', { method: 'POST', body: JSON.stringify(form) })
```

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:push` | Sync schema to database |
| `npm run db:seed` | Seed sample projects + admin user |
| `npm run db:studio` | Open Prisma Studio (DB GUI) |

---

## Deploying to Vercel

1. Push the project to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and import the repo
3. Add Environment Variables in Vercel's project settings:

| Variable | Value |
|---|---|
| `DATABASE_URL` | `file:./dev.db` (or use a hosted DB like PlanetScale/Turso for production) |
| `NEXTAUTH_URL` | `https://your-domain.vercel.app` |
| `NEXTAUTH_SECRET` | A long random string (generate with `openssl rand -base64 32`) |
| `NEXT_PUBLIC_SITE_URL` | `https://your-domain.vercel.app` |

> **Important for production:** SQLite is a local file-based database and won't persist on serverless platforms like Vercel. For production, use a hosted database such as [Turso](https://turso.tech) (SQLite-compatible) or switch to PostgreSQL via PlanetScale/Neon and update the Prisma provider accordingly.

4. Click **Deploy** — Vercel will handle the rest.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 14 (App Router) | Framework |
| Tailwind CSS | Styling |
| Framer Motion | Animations |
| Prisma + SQLite | Database ORM |
| NextAuth.js | Admin authentication |
| @dnd-kit | Drag-and-drop project reordering |
| react-hot-toast | Toast notifications |
| Sharp | Image optimisation |

---

*Built for COG Designs · © 2025 Matte Elijah Innocent · Kampala, Uganda*
