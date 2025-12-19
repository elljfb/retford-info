# Retford.info - Complete Page Inventory

## All Pages at a Glance

This document lists every page in your website, what it does, and how to customize it.

## Public-Facing Pages

### Home Page
**URL:** `/`
**File:** `src/app/page.tsx`
**Purpose:** Main landing page with categories grid and introduction
**Edit:** Add your town description, customize category grid
**Shows:** 
- Cover image with title
- Introduction section
- 6 category cards (Shops, Eat & Drink, Accommodation, Things to Do, News, Articles)
- "Where is Retford?" section with description
- About Retford.info section

### Category Pages
**URL:** `/categories/[slug]` (e.g., `/categories/eat-drink`)
**File:** `src/app/categories/[slug]/page.tsx`
**Purpose:** Show all businesses in a category
**Auto-generated from:** Business CSV categories
**Shows:**
- Cover image with category name
- Category introduction
- Premium businesses (featured)
- All basic businesses in a list
- Business phone numbers and addresses

**Categories included:**
- `/categories/shops` - Shops and Businesses
- `/categories/eat-drink` - Eat and Drink
- `/categories/accommodation` - Accommodation
- `/categories/things-to-do` - Things to Do

### Individual Business Pages
**URL:** `/business/[slug]` (e.g., `/business/the-coffee-house`)
**File:** `src/app/business/[slug]/page.tsx`
**Purpose:** Detailed business profile
**Auto-generated from:** Business CSV entries
**Shows (varies by premium/basic):**
- Cover image
- Business name and category
- Contact details (phone, email, website)
- Social media links
- Description
- Opening hours
- Location and map placeholder
- Premium listing features (if premium)
- "Upgrade to premium" box (if basic)
- Call-to-action to mention Retford.info

### Articles Listing
**URL:** `/articles`
**File:** `src/app/articles/page.tsx`
**Purpose:** Shows latest 10 articles
**Auto-generated from:** Markdown files in `data/articles/`
**Shows:**
- Cover image
- List of articles with date and excerpt
- Links to individual articles

### Individual Article Pages
**URL:** `/articles/[slug]` (e.g., `/articles/welcome-to-retford`)
**File:** `src/app/articles/[slug]/page.tsx`
**Purpose:** Full article content
**Auto-generated from:** Markdown files in `data/articles/`
**Shows:**
- Cover image with title
- Article content (rendered from markdown)
- Related articles (up to 2)
- Back to articles link

### News Listing
**URL:** `/news`
**File:** `src/app/news/page.tsx`
**Purpose:** Shows latest 10 news posts
**Auto-generated from:** Markdown files in `data/news/`
**Shows:**
- Cover image
- List of news posts with date and excerpt
- Links to individual posts

### Individual News Pages
**URL:** `/news/[slug]` (e.g., `/news/community-week`)
**File:** `src/app/news/[slug]/page.tsx`
**Purpose:** Full news content
**Auto-generated from:** Markdown files in `data/news/`
**Shows:**
- Cover image with title
- News content (rendered from markdown)
- Related news (up to 2)
- Back to news link

### What's On Calendar
**URL:** `/whats-on`
**File:** `src/app/whats-on/page.tsx`
**Purpose:** Events and activities calendar
**Shows:**
- List of upcoming events
- Event details placeholder
- Ability to submit events
- Event categories

**To customize:**
- Add events manually to the page
- Ready for calendar widget integration

### Car Parks Information
**URL:** `/car-parks`
**File:** `src/app/car-parks/page.tsx`
**Purpose:** Parking information for town
**Shows:**
- List of car parks with details
- Number of spaces
- Parking costs
- Special info (handicap, free times, etc.)
- Parking tips
- Plan your visit section

**To customize:**
- Edit car park details
- Update parking costs
- Add more car parks

### Weather
**URL:** `/weather`
**File:** `src/app/weather/page.tsx`
**Purpose:** Weather information page
**Shows:**
- Weather widget placeholder (ready for integration)
- Climate information
- Links to weather services
- Planning tips for visitors

**To customize:**
- Add weather widget code
- Update weather resources
- Add seasonal information

### About Page
**URL:** `/about`
**File:** `src/app/about/page.tsx`
**Purpose:** Tell visitors about Retford.info
**Shows:**
- Your mission statement
- Why choose Retford.info
- Support local section
- Get your business listed CTA

**To customize:**
- Update mission statement
- Edit "Why choose" reasons
- Add your story

### Advertise/Listing Prices
**URL:** `/advertise`
**File:** `src/app/advertise/page.tsx`
**Purpose:** Show business listing options
**Shows:**
- Basic listing features and price (Free)
- Premium listing features and price (£2/month)
- How it works section (4 steps)
- CTA to get started

**To customize:**
- Update pricing
- Update features list
- Change contact method
- Add payment options

### Contact Page
**URL:** `/contact`
**File:** `src/app/contact/page.tsx`
**Purpose:** Contact form and contact info
**Shows:**
- Contact form (name, email, subject, message)
- Contact information (email, phone, hours, location)
- Quick links to other pages

**To customize:**
- Add your email address
- Add your phone number
- Add your business hours
- Add your physical address

### Privacy Policy
**URL:** `/privacy`
**File:** `src/app/privacy/page.tsx`
**Purpose:** Legal privacy policy
**Shows:**
- Full privacy policy (template included)
- Sections on data collection, usage, security
- User rights
- Contact for privacy questions

**To customize:**
- Update to your specific practices
- Add your contact info
- Update data retention policy if needed
- Review with legal if desired

### Terms & Conditions
**URL:** `/terms`
**File:** `src/app/terms/page.tsx`
**Purpose:** Legal terms of service
**Shows:**
- Full T&Cs (template included)
- Sections on use license, disclaimers, modifications
- Liability limitations
- Governing law

**To customize:**
- Update to your specific terms
- Add any specific disclaimers
- Update contact info
- Review with legal if desired

## Layout Components

### Navbar (Header)
**File:** `src/components/Navbar.tsx`
**Purpose:** Navigation bar at top of every page
**Features:**
- Logo and site title
- Mobile menu button
- Search bar
- Desktop menu items:
  - Shops & Businesses
  - Eat & Drink
  - Accommodation
  - Things to Do
  - What's On
  - Latest Articles
  - Latest News
  - Car Parks
  - Weather
  - About
  - Contact

**To customize:**
- Change logo (currently "R")
- Update menu items
- Change accent color
- Add/remove links

### Footer
**File:** `src/components/Footer.tsx`
**Purpose:** Footer at bottom of every page
**Features:**
- Logo
- Copyright notice
- Quick information links
- Category links
- Advertise your business section
- Back to top button

**To customize:**
- Update copyright year
- Update business info
- Add/remove links
- Change footer links
- Update advertising CTA

## Data Files

### Business Listings
**File:** `data/businesses.csv`
**Purpose:** All business data
**How it works:**
- CSV (spreadsheet) format
- One row per business
- Columns: name, slug, category, subcategory, address, phone, is_premium, email, website, facebook, instagram, twitter, description, images, opening_hours
- Auto-generates business listing pages
- Auto-generates category pages

**See:** CSV_GUIDE.md for detailed format

### Articles
**Directory:** `data/articles/`
**File pattern:** `*.md` (markdown files)
**Purpose:** Blog articles
**How it works:**
- One file per article
- Markdown format with frontmatter
- Frontmatter includes: title, date, excerpt
- Auto-generates article pages
- Related articles shown on each article

**See:** README.md for markdown format

### News Posts
**Directory:** `data/news/`
**File pattern:** `*.md` (markdown files)
**Purpose:** News updates
**How it works:**
- One file per news post
- Markdown format with frontmatter
- Frontmatter includes: title, date, excerpt
- Auto-generates news pages
- Related news shown on each post

**See:** README.md for markdown format

## Dynamic vs Static Pages

### Dynamic Pages (Auto-generated)
These pages are automatically created from your data:
- `/categories/*` - Generated from CSV categories
- `/business/*` - Generated from CSV businesses
- `/articles/*` - Generated from markdown articles
- `/news/*` - Generated from markdown news

### Static Pages
These pages are hand-coded:
- `/` - Homepage
- `/articles` - Articles listing
- `/news` - News listing
- `/about` - About page
- `/advertise` - Advertising page
- `/contact` - Contact page
- `/whats-on` - Events page
- `/car-parks` - Parking page
- `/weather` - Weather page
- `/privacy` - Privacy policy
- `/terms` - Terms of service

## Page Structure

Every page includes:
1. **Navbar** - Navigation at top
2. **Cover Section** - Large image with H1 title
3. **Main Content** - Page-specific content
4. **Footer** - Footer with links and info
5. **Back to Top Button** - Appears on footer when scrolled

## Metadata for SEO

Every page has:
- Unique title
- Description for search engines
- Open Graph meta tags ready
- Structured data ready

## Performance Notes

- **Static Generation:** Category, business, article, and news pages are pre-built at deploy time
- **Fast Loading:** Minimal JavaScript, optimized CSS
- **Mobile Optimized:** Responsive design works on all devices
- **SEO Ready:** Proper titles, descriptions, and structure

## File Navigation

To edit a specific page:
1. Find it in this document
2. Look for the "File:" path
3. Open that file in VS Code
4. Make your changes
5. Restart dev server if needed
6. Check http://localhost:3000

## Adding New Pages

To add a new page:
1. Create a new folder in `src/app/` 
2. Create a `page.tsx` file in that folder
3. Export default component with metadata
4. File example:

```typescript
export const metadata = {
  title: 'New Page | Retford.info',
  description: 'Page description',
};

export default function NewPage() {
  return (
    <div>
      {/* Your content */}
    </div>
  );
}
```

5. Access at `http://localhost:3000/new-page`

## Summary

Your site has:
- ✅ 4 main category pages (auto-generated)
- ✅ Business listing pages (auto-generated from CSV)
- ✅ Article pages (auto-generated from markdown)
- ✅ News pages (auto-generated from markdown)
- ✅ 8 static utility pages
- ✅ 1 responsive navbar
- ✅ 1 feature-rich footer
- ✅ Total: 50+ pages possible!

All optimized, fast, and ready to serve your community.

---

For more help, see:
- README.md - Full documentation
- SETUP.md - Setup guide
- CSV_GUIDE.md - Data format
- LAUNCH_CHECKLIST.md - Pre-launch checklist
