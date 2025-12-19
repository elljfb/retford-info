# Retford.info Setup & Installation Guide

Welcome to your new Retford.info website! This guide will help you get started quickly.

## Quick Start

### 1. Install Dependencies

Navigate to your project directory and install all required packages:

```bash
cd c:\Users\Ell\Documents\Code\retford-info
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

The website will be available at **http://localhost:3000**

### 3. View Your Site

Open your browser and visit http://localhost:3000 to see the homepage.

## File Structure Overview

```
retford-info/
├── src/
│   ├── app/                          # All pages and routes
│   │   ├── page.tsx                 # Homepage
│   │   ├── layout.tsx               # Root layout
│   │   ├── categories/[slug]/       # Category pages (dynamic)
│   │   ├── business/[slug]/         # Business detail pages (dynamic)
│   │   ├── articles/                # Articles listing
│   │   │   ├── page.tsx            # All articles
│   │   │   └── [slug]/             # Individual article pages
│   │   ├── news/                    # News listings
│   │   │   ├── page.tsx            # All news
│   │   │   └── [slug]/             # Individual news pages
│   │   ├── about/                   # About page
│   │   ├── advertise/               # Advertising info page
│   │   ├── contact/                 # Contact page
│   │   ├── whats-on/                # Events page
│   │   ├── car-parks/               # Parking info
│   │   ├── weather/                 # Weather page
│   │   ├── privacy/                 # Privacy policy
│   │   └── terms/                   # Terms & conditions
│   ├── components/
│   │   ├── Navbar.tsx              # Navigation bar
│   │   └── Footer.tsx              # Footer
│   ├── lib/
│   │   ├── businesses.ts           # Business data functions
│   │   ├── articles.ts             # Article/news functions
│   │   └── utils.ts                # Helper utilities
│   └── globals.css                 # Global styles
├── data/
│   ├── businesses.csv              # Business listings (CSV)
│   ├── articles/                   # Markdown articles
│   │   ├── welcome-to-retford.md
│   │   └── weekend-guide.md
│   └── news/                       # Markdown news posts
│       ├── community-week.md
│       └── business-spotlight.md
├── public/                         # Static files (images, etc.)
├── package.json                    # Dependencies
├── tsconfig.json                   # TypeScript config
├── tailwind.config.ts             # Tailwind CSS config
├── postcss.config.js              # PostCSS config
├── next.config.ts                 # Next.js config
└── README.md                       # Project documentation
```

## Adding Your Own Content

### Add a Business

Edit `data/businesses.csv` and add a new row:

```csv
Business Name,business-slug,Category Name,Subcategory,Address,Phone,true,email@example.com,https://website.com,https://facebook.com/page,https://instagram.com/page,,Description here,image1.jpg;image2.jpg,"Mon-Fri: 9am-5pm
Sat: 10am-4pm"
```

**Important:** 
- `slug` must be lowercase with hyphens (no spaces)
- `is_premium` should be `true` or `false`
- Optional fields can be left empty
- For multiple images, separate with semicolons
- Opening hours use newlines for different days

### Add an Article

Create a new file in `data/articles/` with a `.md` extension:

```markdown
---
title: Your Article Title
date: 2024-12-19
excerpt: A short summary that appears in the listing.
---

# Your Article Title

Your article content here using markdown formatting.

You can use **bold**, *italic*, and other markdown features.
```

### Add News

Create a new file in `data/news/` with a `.md` extension:

```markdown
---
title: Your News Title
date: 2024-12-19
excerpt: A short summary of the news.
---

# Your News Title

Your news content here...
```

## Customizing the Site

### Change the Accent Color

Edit `tailwind.config.ts`:

```typescript
colors: {
  accent: '#YOUR_COLOR_HERE',      // Main accent color
  'accent-dark': '#DARKER_SHADE',  // Hover color
}
```

Current colors: Light blue (#87CEEB) and darker blue (#4A90E2)

### Update Contact Information

Edit `src/app/contact/page.tsx` to add your:
- Email address
- Phone number
- Business hours
- Location

### Update Footer Links

Edit `src/components/Footer.tsx` to customize:
- Footer menu items
- Copyright information
- Contact links

### Update Business Listing Info

Edit `src/app/advertise/page.tsx` to update:
- Pricing information
- Features list
- Contact methods

## Building for Production

When you're ready to publish:

```bash
npm run build
npm run start
```

This creates an optimized version that's faster and uses less resources.

## Deploying Your Site

### Option 1: Vercel (Recommended)

1. Push your code to GitHub
2. Go to vercel.com and sign up
3. Connect your GitHub repository
4. Vercel automatically deploys your site

Benefits:
- Instant deployment on code push
- Free SSL certificate
- Fast global CDN
- Easy environment variables

### Option 2: Netlify

1. Push your code to GitHub
2. Go to netlify.com and sign up
3. Click "New site from Git"
4. Select your repository
5. Deploy

### Option 3: Traditional Hosting

```bash
npm run build
# Upload the `.next` folder and dependencies to your server
npm run start
```

## Performance Tips

✅ The site is already optimized, but you can:

1. Add real images to replace placeholders
2. Keep markdown files concise
3. Limit CSV to essential fields
4. Use a CDN for image hosting
5. Monitor page load times

## Troubleshooting

### Port 3000 already in use

```bash
npm run dev -- -p 3001
# Uses port 3001 instead
```

### Business not showing up

- Check the slug is lowercase with hyphens only
- Verify the CSV file is valid (no extra spaces)
- Restart the development server

### Articles not appearing

- Check the frontmatter (---) at the top of markdown files
- Ensure the date format is YYYY-MM-DD
- Restart the development server

### Images not loading

- Add images to the `public/` folder
- Reference them in markdown as `/image-name.jpg`
- Or add URLs to the CSV for external images

## Next Steps

1. ✅ Install dependencies: `npm install`
2. ✅ Start development: `npm run dev`
3. ✅ Test the site at http://localhost:3000
4. ✅ Add your businesses to `data/businesses.csv`
5. ✅ Add articles to `data/articles/` and `data/news/`
6. ✅ Customize colors and information
7. ✅ Build for production: `npm run build`
8. ✅ Deploy to Vercel, Netlify, or your server

## Support & Questions

For detailed information about the project structure and features, see `README.md`.

For help with Next.js, visit: https://nextjs.org/docs
For help with Tailwind CSS, visit: https://tailwindcss.com/docs

Good luck with your Retford.info website! 🚀
