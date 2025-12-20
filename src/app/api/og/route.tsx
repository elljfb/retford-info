import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams, origin } = new URL(req.url);
    const title = decodeURIComponent(searchParams.get('title') || 'Retford.info');
    const subtitle = decodeURIComponent(searchParams.get('subtitle') || '');
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
            background: 'linear-gradient(135deg, #87CEEB 0%, #4A90E2 100%)',
            padding: '60px',
          }}
        >
          {/* Retford.info text logo */}
          <div
            style={{
              fontSize: '80px',
              fontWeight: 'bold',
              color: 'white',
              textAlign: 'center',
              marginBottom: '40px',
              textShadow: '0 4px 6px rgba(0,0,0,0.1)',
            }}
          >
            Retford.info
          </div>
          
          {/* Title */}
          <div
            style={{
              fontSize: '60px',
              fontWeight: 'bold',
              color: 'white',
              textAlign: 'center',
              marginBottom: subtitle ? '20px' : '0',
              maxWidth: '90%',
              lineHeight: '1.2',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            {title}
          </div>

          {/* Subtitle (category/subcategory) */}
          {subtitle && (
            <div
              style={{
                fontSize: '36px',
                color: 'rgba(255,255,255,0.9)',
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
