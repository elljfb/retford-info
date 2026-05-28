const ADS_TXT_URL =
  'https://adstxt.journeymv.com/sites/e52c9d4f-adf6-4926-b450-7f5809249b41/ads.txt';

export const revalidate = 900;

export async function GET() {
  const upstreamResponse = await fetch(ADS_TXT_URL, {
    headers: {
      Accept: 'text/plain',
    },
    next: {
      revalidate: 900,
    },
  });

  if (!upstreamResponse.ok) {
    return new Response('# ads.txt temporarily unavailable\n', {
      status: 502,
      headers: {
        'Cache-Control': 'public, max-age=0, s-maxage=60',
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
  }

  const adsTxt = await upstreamResponse.text();

  return new Response(adsTxt.endsWith('\n') ? adsTxt : `${adsTxt}\n`, {
    headers: {
      'Cache-Control': 'public, max-age=0, s-maxage=900, stale-while-revalidate=86400',
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
