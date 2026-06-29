import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const title = searchParams.get('title') || 'Someone sent you a digital bouquet'

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fdf6f0',
            border: '24px solid #f6e6d9',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 64,
              fontFamily: 'serif',
              letterSpacing: '-0.05em',
              fontStyle: 'normal',
              color: '#1a1a1a',
              marginTop: 30,
              padding: '0 120px',
              lineHeight: 1.2,
              whiteSpace: 'pre-wrap',
              textAlign: 'center',
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 32,
              fontFamily: 'sans-serif',
              color: '#6b7280',
              marginTop: 40,
            }}
          >
            Dear Bloomy
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (e: any) {
    console.error(e)
    return new Response('Failed to generate image', { status: 500 })
  }
}
