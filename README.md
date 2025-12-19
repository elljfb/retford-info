# Retford.info - Local Community Information Website

A modern, lightweight, and responsive website for the town of Retford, Nottinghamshire.

## Features

- **Homepage** - Introducing Retford with featured categories and information
- **Category Pages** - Browse businesses by type (Shops, Restaurants, Accommodation, etc.)
- **Business Listings** - Detailed pages for each business with contact info, opening hours, and social media links
- **Premium Listings** - Featured businesses with photo galleries and enhanced information
- **Articles & News** - Markdown-based articles and news posts with related content recommendations
- **Responsive Design** - Mobile-friendly layout that works on all devices
- **Light Blue Accent Color** - Clean, modern design with the accent color throughout
- **Fast & Lightweight** - Next.js for optimal performance

## Getting Started

### Prerequisites

- Node.js 18+ or higher
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
```bash
cd retford-info
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

```
retford-info/
├── src/
│   ├── app/                 # Next.js app directory with pages
│   │   ├── page.tsx        # Homepage
│   │   ├── categories/     # Category pages
│   │   ├── business/       # Individual business pages
│   │   ├── articles/       # Articles listing and individual articles
│   │   ├── news/           # News listing and individual news items
│   │   └── (other pages)   # Additional pages (About, Contact, etc.)
│   ├── components/          # Reusable React components
│   │   ├── Navbar.tsx      # Navigation bar
│   │   └── Footer.tsx      # Footer component
│   ├── lib/                # Utility functions
│   │   ├── businesses.ts   # Business data handling
│   │   ├── articles.ts     # Article/news data handling
│   │   └── utils.ts        # Helper functions
│   └── globals.css         # Global styles and Tailwind imports
├── data/                    # Data files
│   ├── businesses.csv      # Business listings (CSV format)
│   ├── articles/           # Markdown article files
│   └── news/               # Markdown news files
├── public/                  # Static assets
├── package.json            # Project dependencies
├── tailwind.config.ts      # Tailwind CSS configuration
└── next.config.ts          # Next.js configuration
```

## Managing Content

### Business Listings

All businesses are stored in `data/businesses.csv`. Each business has the following fields:

- **name** - Business name
- **slug** - URL-friendly identifier (lowercase, hyphens)
- **category** - Main category (e.g., "Shops and Businesses", "Eat and Drink")
- **subcategory** - Subcategory (e.g., "Cafes", "Restaurants", "Hotels")
- **address** - Business address
- **phone** - Contact phone number
- **is_premium** - true/false for premium listing
- **email** - Contact email (optional)
- **website** - Website URL (optional)
- **facebook** - Facebook URL (optional)
- **instagram** - Instagram URL (optional)
- **twitter** - Twitter URL (optional)
- **description** - Business description (optional)
- **images** - Comma-separated image filenames (optional)
- **opening_hours** - Opening hours formatted with line breaks (optional)

### Example Business Entry

```csv
The Coffee House,the-coffee-house,Eat and Drink,Cafes,23 Market Place,01777 123456,true,hello@coffeehouse.co.uk,https://coffeehouse.co.uk,https://facebook.com/coffeehouse,https://instagram.com/coffeehouse,,Premium coffee and pastry shop with cozy atmosphere.,cafe1.jpg;cafe2.jpg,"Monday - Friday: 8am - 6pm
Saturday: 9am - 5pm"
```

### Articles and News

Articles and news posts are stored as Markdown files in `data/articles/` and `data/news/` respectively.

Each file should include frontmatter with:
- **title** - Article title
- **date** - Publication date (YYYY-MM-DD)
- **excerpt** - Short summary

Example:
```markdown
---
title: Welcome to Retford
date: 2024-12-19
excerpt: Discover what makes Retford such a special place to visit and live.
---

# Welcome to Retford

Your article content here...
```

## Customization

### Colors

The accent color (light blue) is configured in `tailwind.config.ts`:

```typescript
colors: {
  accent: '#87CEEB',
  'accent-dark': '#4A90E2',
}
```

Change these values to customize the color scheme.

### Styling

Global styles are in `src/globals.css`. Additional component styles use Tailwind CSS classes directly in JSX files.

### Links and Contact Info

Update the following files with your business information:
- `src/components/Footer.tsx` - Footer links and business info
- `src/app/contact/page.tsx` - Contact page with phone/email
- `src/app/advertise/page.tsx` - Advertising information

## Building for Production

To create an optimized production build:

```bash
npm run build
npm run start
```

## Deployment

This Next.js application can be deployed to:
- **Vercel** (recommended) - Zero-config deployment
- **Netlify** - With Next.js adapter
- **Traditional servers** - Using Node.js

For Vercel deployment, simply connect your GitHub repository to Vercel and it will auto-deploy on push.

## Performance

The site is optimized for speed through:
- Next.js static generation for pages
- Minimal CSS animations (as specified)
- Optimized images
- Clean, lightweight components
- Efficient data loading

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## License

This project is the property of Retford.info.

## Support

For questions or issues, contact info@retford.info

## Future Enhancements

Potential features to add:
- Map integration (Google Maps/Leaflet)
- Image upload for business listings
- Comment system for articles
- Email newsletter signup
- Event calendar system
- Weather widget
- Search functionality with filters
- Business analytics dashboard
- Payment system for premium listings
