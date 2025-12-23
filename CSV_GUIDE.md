# CSV Data Management Guide

This guide shows how to properly format and manage business listings in `data/businesses.csv`.

## CSV Format

The businesses CSV file contains the following columns (in order):

| Column | Required | Type | Example | Notes |
|--------|----------|------|---------|-------|
| name | Yes | Text | "The Coffee House" | Business name |
| slug | Yes | Text | "the-coffee-house" | URL-friendly identifier |
| category | Yes | Text | "Eat and Drink" | Main category |
| subcategory | Yes | Text | "Cafes" | Subcategory |
| address | Yes | Text | "23 Market Place" | Street address |
| phone | Yes | Text | "01777 123456" | Contact phone |
| is_premium | Yes | Boolean | "true" or "false" | Premium listing? |
| email | No | Email | "hello@example.com" | Contact email |
| website | No | URL | "https://example.com" | Website URL |
| facebook | No | URL | "https://facebook.com/page" | Facebook page |
| instagram | No | URL | "https://instagram.com/page" | Instagram account |
| twitter | No | URL | "https://twitter.com/page" | Twitter account |
| description | No | Text | "A cozy cafe..." | Business description |
| images | No | Text | "cafe1.jpg;cafe2.jpg" | Semicolon-separated |
| opening_hours | No | Text | "Mon-Fri: 9am-5pm" | Hours (with line breaks) |

## Rules for Each Field

### name
- Required
- Maximum 100 characters
- Should be the official business name
- Example: "Mario's Italian Restaurant"

### slug
- Required
- Must be lowercase
- Use hyphens to separate words (no spaces)
- Cannot contain special characters except hyphens
- Must be unique
- Examples: "marios-italian", "the-coffee-house", "smiths-bookshop"

### category
- Required
- Must match one of:
  - "Shops and Businesses"
  - "Eat and Drink"
  - "Accommodation"
  - "Things to Do"
  - (or other custom categories you define)
- Case-sensitive
- **For multiple categories**: Separate with semicolons (no spaces after semicolons)
- Example single: "Eat and Drink"
- Example multiple: "Eat and Drink;Things to Do"

### subcategory
- Required
- Examples:
  - For "Eat and Drink": Cafes, Restaurants, Pubs and Bars, Takeaways
  - For "Accommodation": Hotels, Bed & Breakfast, Self-catering
  - For "Shops": Clothes, Books, Food & Delicatessen
  - For "Things to Do": Museums, Sports, Entertainment
- **For multiple subcategories**: Separate with semicolons (no spaces after semicolons)
- Example single: "Restaurants"
- Example multiple: "Pubs and Bars;Restaurants"

### address
- Required
- Full street address
- Example: "23 Market Place, Retford, Nottinghamshire"

### phone
- Required
- Include country code if necessary
- Format: "01777 123456" or "+44 1777 123456"

### is_premium
- Required
- Use exactly: "true" or "false" (lowercase)
- Premium listings appear first and have more features

### email (Optional)
- Contact email address
- Should be a valid email format
- Example: "info@business.co.uk"

### website (Optional)
- Full URL with http:// or https://
- Example: "https://businessname.com"
- Leave empty if not applicable

### facebook (Optional)
- Full Facebook page URL
- Example: "https://facebook.com/businessname"
- Leave empty if not applicable

### instagram (Optional)
- Full Instagram profile URL
- Example: "https://instagram.com/businessname"
- Leave empty if not applicable

### twitter (Optional)
- Full Twitter profile URL
- Example: "https://twitter.com/businessname"
- Leave empty if not applicable

### description (Optional)
- Detailed business description
- Can be multiple sentences
- Use this for premium listings
- Example: "Award-winning Italian restaurant with authentic recipes"

### images (Optional)
- Semicolon-separated list of image filenames
- Image files should be in the `public/` folder
- Example: "restaurant1.jpg;restaurant2.jpg;restaurant3.jpg"
- Leave empty if no images

### opening_hours (Optional)
- Opening hours for the business
- Use newlines to separate days
- Format example:
  ```
  Monday - Friday: 9am - 5pm
  Saturday: 10am - 4pm
  Sunday: Closed
  ```

## CSV Entry Examples

### Basic Listing (Free)

```csv
Smith & Co Bookshop,smith-bookshop,Shops and Businesses,Books,North Street,01777 111222,false,,,,,,Local independent bookshop with quality selection,,
```

### Premium Listing (Featured)

```csv
The Coffee House,the-coffee-house,Eat and Drink,Cafes,23 Market Place,01777 123456,true,hello@coffeehouse.co.uk,https://coffeehouse.co.uk,https://facebook.com/coffeehouse,https://instagram.com/coffeehouse,,Speciality coffee roasted on-site with homemade pastries,cafe1.jpg;cafe2.jpg;cafe3.jpg,"Monday - Friday: 8am - 6pm
Saturday: 9am - 5pm
Sunday: 10am - 4pm"
```

### Premium Listing with Full Details

```csv
The Orchard Hotel,the-orchard-hotel,Accommodation,Hotels,Chapel Lane,01777 456789,true,info@theorchard.co.uk,https://theorchard.co.uk,https://facebook.com/theorchard,https://instagram.com/theorchard,,Family-friendly 3-star hotel in town centre with en-suite rooms and breakfast included,hotel1.jpg;hotel2.jpg;hotel3.jpg;hotel4.jpg,"Check-in: 3pm
Check-out: 11am
Reception: Open 24 hours"
```

## How to Edit the CSV

### Using Excel or Google Sheets

1. Open `data/businesses.csv` in Excel/Sheets
2. Each row is a business
3. Each column is a field
4. Save as CSV format when done

### Using a Text Editor

1. Open `data/businesses.csv` in VS Code
2. Edit carefully, ensuring commas separate fields
3. Be careful with commas inside field values (use quotes)
4. Save the file

### Adding a New Business

Add a new row at the end with all required fields:

```csv
Business Name,business-slug,Category,Subcategory,Address,Phone,true,email@example.com,https://website.com,https://facebook.com/page,https://instagram.com/page,,Description text,image1.jpg;image2.jpg,"Hours formatted
With line breaks"
```

## Important Notes

⚠️ **Crucial Things to Remember:**

1. **Slugs must be unique** - No two businesses can have the same slug
2. **Slugs are case-sensitive in some systems** - Always use lowercase
3. **Save as CSV** - Use UTF-8 encoding without BOM
4. **Restart the server** - After editing CSV, restart `npm run dev`
5. **Commas in text** - If text contains a comma, wrap it in quotes:
   - Example: `"Coffee House & Bakery, Restaurant"`
6. **Quotes in text** - Escape with another quote:
   - Example: `"The ""Morning"" Café"`
7. **Line breaks in fields** - Use actual line breaks in CSV (not \n)

## Categories & Subcategories Reference

### Shops and Businesses
- Clothes & Fashion
- Books
- Food & Delicatessen
- Hardware & Tools
- Electronics
- Gifts & Souvenirs
- Beauty & Wellness
- Hair & Barber

### Eat and Drink
- Cafes
- Restaurants
- Pubs and Bars
- Takeaways and Fast Food
- Tea Rooms
- Bakeries

### Accommodation
- Hotels
- Bed & Breakfast
- Guest Houses
- Self-catering
- Holiday Cottages

### Things to Do
- Museums & Galleries
- Sports & Recreation
- Entertainment
- Parks & Outdoors
- Tours & Attractions
- Leisure Centers

## CSV Validation

Before uploading, ensure:

- [ ] All required fields have values
- [ ] Slugs are unique and lowercase with hyphens only
- [ ] URLs start with http:// or https://
- [ ] Category and subcategory are spelled correctly
- [ ] is_premium is either "true" or "false"
- [ ] No extra spaces at start/end of fields
- [ ] Multiple categories/subcategories are separated by semicolons only (no spaces after semicolons)
- [ ] File is saved as CSV UTF-8 format

## Multiple Categories Example

For businesses that fit into multiple categories (e.g., a pub that also serves restaurant-quality food):

```csv
name,slug,category,subcategory,...
"The Red Lion","the-red-lion","Eat and Drink","Pubs and Bars;Restaurants",...
"Village Hall & Cafe","village-hall-cafe","Things to Do;Eat and Drink","Community Centers;Cafes",...
```

This allows:
- The Red Lion to appear in both "Pubs and Bars" AND "Restaurants" listings
- Village Hall to appear in both categories and both subcategories

## Troubleshooting

**Business not appearing on website?**
- Check slug spelling (must be lowercase with hyphens)
- Verify category spelling matches existing categories
- Restart development server after CSV changes

**Premium listing not showing features?**
- Ensure is_premium = "true"
- Add email, website, or social media URLs
- Add description and opening_hours

**Images not loading?**
- Add image files to `public/` folder first
- Reference filename only in images column (not full path)
- Separate multiple images with semicolons

**Special characters breaking the CSV?**
- Wrap the field value in double quotes
- Escape quote marks by doubling them

For more help, see `README.md` and `SETUP.md`.
