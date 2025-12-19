# Launch Checklist - Getting Retford.info Live

Use this checklist to ensure your website is ready for launch.

## Pre-Launch Preparation (1-2 weeks before)

### Content & Data
- [ ] Add all your businesses to `data/businesses.csv`
- [ ] Categorize each business correctly
- [ ] Mark premium vs. basic listings
- [ ] Add business descriptions for premium listings
- [ ] Add opening hours for at least premium listings
- [ ] Verify all phone numbers and addresses
- [ ] Add social media links where available
- [ ] Create at least 3-5 articles in `data/articles/`
- [ ] Create at least 2-3 news posts in `data/news/`
- [ ] Gather business photos for premium listings

### Website Customization
- [ ] Review and update the homepage content
- [ ] Update contact page with your real contact details
- [ ] Update advertise page with your pricing/payment methods
- [ ] Review "About" page and edit as needed
- [ ] Update footer with your information
- [ ] Change accent colors if desired (optional)
- [ ] Review all policy pages (Privacy, Terms)
- [ ] Add your business email address throughout
- [ ] Update phone numbers where needed
- [ ] Check "What's On" page for events

### Technical Setup
- [ ] Test locally with `npm run dev`
- [ ] Check all links work correctly
- [ ] Test on mobile devices (use browser DevTools)
- [ ] Test on tablets
- [ ] Test on desktop
- [ ] Check all forms work (contact form at minimum)
- [ ] Verify images load correctly
- [ ] Test navigation menu on mobile
- [ ] Test footer links
- [ ] Run `npm run build` locally and check for errors

## One Week Before Launch

### Functionality Testing
- [ ] Click every link and verify it works
- [ ] Test all navigation paths
- [ ] Try accessing category pages
- [ ] Try accessing individual business pages
- [ ] Try accessing all articles
- [ ] Try accessing all news posts
- [ ] Check that premium listings appear first on category pages
- [ ] Check that "Featured" badge shows on premium listings
- [ ] Verify search works if implemented
- [ ] Test contact form

### Content Review
- [ ] Check for spelling/grammar errors on all pages
- [ ] Verify business information is accurate
- [ ] Check opening hours are correct
- [ ] Verify phone numbers are correct
- [ ] Check addresses are complete
- [ ] Review article/news content for quality
- [ ] Ensure images are appropriate and load quickly
- [ ] Check that all social media links work

### SEO & Meta Data
- [ ] Add Google Analytics code (if using)
- [ ] Set up Google Search Console
- [ ] Verify meta descriptions on key pages
- [ ] Check page titles are descriptive
- [ ] Add schema markup if possible (for local business)

## Launch Day

### Domain & Hosting
- [ ] Domain name registered and pointing to your site
- [ ] SSL certificate installed (should be automatic)
- [ ] Website accessible via domain name
- [ ] Redirect http to https (usually automatic)
- [ ] Check site loads quickly from different locations

### Final Checks
- [ ] Visit website from different devices
- [ ] Test mobile responsiveness one more time
- [ ] Check that all pages load without errors
- [ ] Verify contact form sends emails
- [ ] Check that images display correctly
- [ ] Test navigation on slow internet connection

### Launch Promotion
- [ ] Announce on local Facebook groups
- [ ] Email local businesses about listing opportunities
- [ ] Share on community forums
- [ ] Tell local press about the site
- [ ] Add to local business directories
- [ ] Link from related local websites

## First Week After Launch

### Monitoring
- [ ] Check Google Analytics for traffic
- [ ] Monitor contact form submissions
- [ ] Check for any error messages in browser console
- [ ] Look for broken links using Google Search Console
- [ ] Monitor page load times

### Community Engagement
- [ ] Respond to any business listing inquiries
- [ ] Share featured businesses on social media
- [ ] Publish new articles or news
- [ ] Check for feedback and bug reports

### Ongoing Tasks
- [ ] Update "Latest News" section weekly
- [ ] Add new articles monthly
- [ ] Monitor for broken links
- [ ] Update business hours as they change
- [ ] Add new businesses as they contact you
- [ ] Promote premium listings to local businesses
- [ ] Keep contact information up-to-date

## Launching Your Site

### Option A: Vercel (Recommended - 5 minutes)

1. Push code to GitHub
2. Go to vercel.com
3. Sign in with GitHub
4. Click "Add New..." → "Project"
5. Select your repository
6. Click "Deploy"
7. Set up custom domain in Vercel settings
8. Done!

### Option B: Netlify (5 minutes)

1. Push code to GitHub
2. Go to netlify.com
3. Click "New site from Git"
4. Select your repository
5. Deploy settings are usually fine as-is
6. Click "Deploy site"
7. Set up custom domain
8. Done!

### Option C: Traditional Server (15 minutes)

1. Run `npm run build`
2. Upload `.next` folder to server
3. Upload `node_modules` to server
4. Upload `data` folder to server
5. Run `npm run start` on server
6. Point domain to server IP
7. Set up SSL certificate (Let's Encrypt is free)

## Post-Launch Optimization

### First Month
- [ ] Analyze traffic patterns in Google Analytics
- [ ] Identify most popular pages
- [ ] Check search terms people use to find you
- [ ] Monitor bounce rate and time on site
- [ ] Optimize pages with high bounce rates
- [ ] Ask for feedback from local businesses
- [ ] Gather user feedback

### Ongoing Improvements
- [ ] Add map integration for business locations
- [ ] Implement real-time event calendar
- [ ] Add image upload for businesses
- [ ] Improve search functionality
- [ ] Add weather widget
- [ ] Implement email newsletter
- [ ] Add review system
- [ ] Mobile app (optional)

## Performance Targets

After launch, aim for:
- ⚡ Page load time: < 2 seconds
- 📊 Google PageSpeed: > 90
- 📱 Mobile usability: 100% compatible
- 🔒 SSL/TLS: A+ rating
- 📈 Monthly growth: 10% traffic increase

## Important Reminders

✅ **Keep backups** of your data
✅ **Update regularly** with new content
✅ **Monitor performance** using Google Analytics
✅ **Respond quickly** to business inquiries
✅ **Keep security** up-to-date
✅ **Test new features** before launching
✅ **Gather user feedback** regularly
✅ **Promote your site** consistently

## Contact & Support

If you need help:
- Check the `README.md` for documentation
- Check `SETUP.md` for setup instructions
- Check `CSV_GUIDE.md` for data management
- Review Next.js docs: https://nextjs.org/docs
- Contact your hosting provider for server issues

## Success Metrics

Track these after launch:

| Metric | Target | How to Track |
|--------|--------|--------------|
| Monthly visitors | 500+ | Google Analytics |
| Pages per session | 2+ | Google Analytics |
| Bounce rate | < 50% | Google Analytics |
| Premium listings | 10+ | Manual count |
| Business inquiries | 5+ per month | Contact form |
| Return visitors | > 30% | Google Analytics |

---

Good luck with your launch! 🚀 Retford.info is ready to serve your community!
