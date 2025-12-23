# Multiple Categories Feature Guide

## Overview

Your website now supports businesses having multiple categories and subcategories! This is perfect for businesses that don't fit neatly into just one category, like pubs that also serve restaurant-quality food, or cafes that are also tourist attractions.

## How It Works

### In the CSV File

Simply separate multiple categories or subcategories with a **semicolon (;)** - no spaces needed after the semicolon.

#### Examples:

**Single Category/Subcategory (works as before):**
```csv
name,slug,category,subcategory,...
"The Coffee Shop","the-coffee-shop","Eat and Drink","Cafes",...
```

**Multiple Subcategories (same category):**
```csv
name,slug,category,subcategory,...
"The Red Lion","the-red-lion","Eat and Drink","Pubs and Bars;Restaurants",...
```
This business will appear in both "Pubs and Bars" and "Restaurants" listings!

**Multiple Categories AND Subcategories:**
```csv
name,slug,category,subcategory,...
"Village Cafe","village-cafe","Eat and Drink;Things to Do","Cafes;Attractions",...
```
This business will appear in both main categories and both subcategories!

### Important Rules

1. **Use semicolons only** - no commas (those are for CSV structure)
2. **No spaces after semicolons** - "Pubs and Bars;Restaurants" ✅ not "Pubs and Bars; Restaurants" ❌
3. **Spelling must match exactly** - Categories and subcategories are case-sensitive
4. **Order doesn't matter** - They'll all be treated equally

## What Gets Updated Automatically

When you add multiple categories to a business:

✅ **Category Pages** - Business appears on all relevant category pages
✅ **Subcategory Pages** - Business appears on all relevant subcategory pages  
✅ **Business Detail Page** - Shows all subcategories separated by bullets
✅ **Search & Filtering** - Works across all assigned categories
✅ **Sitemaps & SEO** - All connections maintained

## Real-World Use Cases

### Pub + Restaurant
Perfect for gastro pubs that serve full meals:
```csv
category: "Eat and Drink"
subcategory: "Pubs and Bars;Restaurants"
```

### Hotel + Restaurant
Hotels with notable dining facilities:
```csv
category: "Accommodation;Eat and Drink"
subcategory: "Hotels;Restaurants"
```

### Cafe + Gift Shop
Cafes that also sell local products:
```csv
category: "Eat and Drink;Shops and Businesses"
subcategory: "Cafes;Gifts & Souvenirs"
```

### Tourist Attraction + Cafe
Museums or parks with on-site dining:
```csv
category: "Things to Do;Eat and Drink"
subcategory: "Attractions;Cafes"
```

### Salon + Shop
Hair salons that also sell products:
```csv
category: "Shops and Businesses"
subcategory: "Hairdressers and Barbers;Beauty & Wellness"
```

## How Businesses Are Displayed

### On Business Detail Page
If a business has multiple subcategories like "Pubs and Bars;Restaurants", the page will display:
```
Business Name
Pubs and Bars • Restaurants
```

### On Category/Subcategory Pages
The business will appear in the listing for EACH category/subcategory it's assigned to. So a pub with "Pubs and Bars;Restaurants" appears on:
- `/categories/eat-and-drink` (main category page)
- `/categories/eat-and-drink/pubs-and-bars` (subcategory page)
- `/categories/eat-and-drink/restaurants` (subcategory page)

## Testing Your Changes

After updating the CSV:

1. **Save the file** as CSV UTF-8
2. **Restart your dev server** if running locally
3. **Check each category page** where the business should appear
4. **Visit the business detail page** to see multiple tags displayed

## Common Questions

**Q: Can I have different numbers of categories vs subcategories?**  
A: Yes! Categories and subcategories are independent. You could have 1 category with 3 subcategories, or 2 categories with 1 subcategory each.

**Q: What if I only want multiple subcategories but one category?**  
A: Just put one category and separate subcategories with semicolons:
```csv
category: "Eat and Drink"
subcategory: "Cafes;Restaurants;Bakeries"
```

**Q: Can I mix single and multiple?**  
A: Yes! Most businesses can have single categories, and only use multiple categories for those special cases that need them.

**Q: Will this affect my existing listings?**  
A: No! All existing single-category businesses continue to work exactly as before. This is backward compatible.

**Q: Does this affect premium vs basic listings?**  
A: No, premium and basic status are separate from categories. Multiple-category businesses can be premium or basic.

## Validation Checklist

Before updating live:

- [ ] All semicolons have no spaces after them
- [ ] Category names match exactly (including capitalization)
- [ ] Subcategory names match exactly (including capitalization)
- [ ] Each business has at least one category and one subcategory
- [ ] No typos in category/subcategory names
- [ ] File saved as CSV UTF-8

## Need Help?

If a business isn't appearing where expected:
1. Check the spelling of categories/subcategories
2. Verify no extra spaces around semicolons
3. Make sure categories match existing categories on your site
4. Restart the development server
5. Check the browser console for any errors
