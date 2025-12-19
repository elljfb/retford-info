import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams, origin } = new URL(req.url);
    const title = searchParams.get('title') || 'Retford.info';
    const subtitle = searchParams.get('subtitle') || '';
    const type = searchParams.get('type') || 'page';

    // For articles/news with featured images
    if (type === 'article' && searchParams.get('image')) {
      const imageUrl = searchParams.get('image');
      const fullImageUrl = imageUrl?.startsWith('http') ? imageUrl : `${origin}${imageUrl}`;
      
      return new ImageResponse(
        (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              backgroundImage: `url(${fullImageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        ),
        {
          width: 1200,
          height: 630,
        }
      );
    }

    // Default OG image with logo and text
    const logoUrl = `${origin}/retfordinfo.png`;
    
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            padding: '60px',
          }}
        >
          {/* Logo */}
          <img
            src={logoUrl}
            alt="Retford.info Logo"
            width="180"
            height="180"
            style={{
              marginBottom: '40px',
              borderRadius: '50%',
            }}
          />
          
          {/* Title */}
          <div
            style={{
              fontSize: '60px',
              fontWeight: 'bold',
              color: '#1a1a1a',
              textAlign: 'center',
              marginBottom: subtitle ? '20px' : '0',
              maxWidth: '90%',
              lineHeight: '1.2',
            }}
          >
            {title}
          </div>

          {/* Subtitle (category/subcategory) */}
          {subtitle && (
            <div
              style={{
                fontSize: '40px',
                color: '#4A90E2',
                textAlign: 'center',
                maxWidth: '90%',
              }}
            >
              {subtitle}
            </div>
          )}
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.error('Error generating OG image:', e.message);
    return new Response('Failed to generate image', { status: 500 });
  }
}
