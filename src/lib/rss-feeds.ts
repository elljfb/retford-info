// RSS Feed aggregator for local news sources

export interface NewsItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  image?: string;
  source: string;
}

// Add RSS feeds from local news sources
const RSS_FEEDS = [
  {
    name: 'BBC News',
    url: 'https://feeds.bbci.co.uk/news/topics/ck7rdn2xy1lt/rss.xml',
    source: 'BBC News'
  },
  {
    name: 'Nottinghamshire Live',
    url: 'https://www.nottinghampost.com/all-about/retford?service=rss',
    source: 'Nottinghamshire Live'
  },
  {
    name: 'Lincolnshire Live - Retford',
    url: 'https://www.lincolnshirelive.co.uk/all-about/retford/?service=rss',
    source: 'Lincolnshire Live - Retford'
  },
  {
    name: 'Worksop Guardian',
    url: 'https://www.worksopguardian.co.uk/topic/retford/rss',
    source: 'Worksop Guardian'
  },
  {
    name: 'West Bridgeford Wire',
    url: 'https://westbridgfordwire.com/search/retford/feed/rss2/',
    source: 'West Bridgeford Wire'
  }
  // Add more local news sources as needed
];

async function fetchRSSFeed(feedUrl: string, sourceName: string): Promise<NewsItem[]> {
  try {
    const response = await fetch(feedUrl, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (!response.ok) {
      console.error(`Failed to fetch ${sourceName}: ${response.status}`);
      return [];
    }

    const xml = await response.text();
    const items: NewsItem[] = [];

    // Parse RSS XML (basic parser)
    const itemMatches = xml.matchAll(/<item>([\s\S]*?)<\/item>/g);
    
    for (const match of itemMatches) {
      const itemXml = match[1];
      
      const title = itemXml.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>|<title>(.*?)<\/title>/)?.[1] || 
                    itemXml.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>|<title>(.*?)<\/title>/)?.[2] || '';
      const link = itemXml.match(/<link>(.*?)<\/link>/)?.[1] || '';
      const description = itemXml.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>|<description>(.*?)<\/description>/)?.[1] || 
                         itemXml.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>|<description>(.*?)<\/description>/)?.[2] || '';
      const pubDate = itemXml.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] || '';
      
      // Try to extract image from multiple RSS formats
      let image = 
        // media:thumbnail (common in news feeds)
        itemXml.match(/<media:thumbnail[^>]+url=["']([^"']+)["']/)?.[1] ||
        // media:content
        itemXml.match(/<media:content[^>]+url=["']([^"']+)["']/)?.[1] ||
        // enclosure (podcast/media RSS)
        itemXml.match(/<enclosure[^>]+url=["']([^"']+)["']/)?.[1] ||
        // image tag
        itemXml.match(/<image[^>]*>[\s\S]*?<url>(.*?)<\/url>/)?.[1];
      
      // Or from description HTML (before CDATA stripping)
      if (!image) {
        const rawDescription = itemXml.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>|<description>([\s\S]*?)<\/description>/)?.[1] || 
                               itemXml.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>|<description>([\s\S]*?)<\/description>/)?.[2] || '';
        const imgMatch = rawDescription.match(/<img[^>]+src=["']([^"']+)["']/);
        image = imgMatch?.[1];
      }
      
      // Filter out small icons/tracking pixels
      if (image && (image.includes('1x1') || image.includes('pixel') || image.includes('blank.gif'))) {
        image = undefined;
      }

      if (title && link) {
        items.push({
          title: title.trim(),
          link: link.trim(),
          description: stripHtml(description).substring(0, 200) + '...',
          pubDate: pubDate.trim(),
          image: image?.trim(),
          source: sourceName
        });
      }
    }

    return items;
  } catch (error) {
    console.error(`Error fetching RSS feed from ${sourceName}:`, error);
    return [];
  }
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

export async function getAggregatedNews(limit: number = 20): Promise<NewsItem[]> {
  const allNews: NewsItem[] = [];

  // Fetch from all RSS feeds in parallel
  const feedPromises = RSS_FEEDS.map(feed => 
    fetchRSSFeed(feed.url, feed.source)
  );

  const results = await Promise.all(feedPromises);
  
  // Flatten and combine all news items
  results.forEach(items => allNews.push(...items));

  // Sort by date (most recent first)
  allNews.sort((a, b) => {
    const dateA = new Date(a.pubDate).getTime();
    const dateB = new Date(b.pubDate).getTime();
    return dateB - dateA;
  });

  // Return limited number of items
  return allNews.slice(0, limit);
}

export async function getLatestAggregatedNews(limit: number = 6): Promise<NewsItem[]> {
  return getAggregatedNews(limit);
}
