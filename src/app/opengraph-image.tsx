import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'PrimeForge — Web Apps & Autonomous AI Agents Studio';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#09090b',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
          fontFamily: 'sans-serif',
          position: 'relative',
          color: '#ffffff',
        }}
      >
        {/* Radial Background Accent Glow */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 50% 30%, rgba(37,99,235,0.3) 0%, rgba(10,10,10,0.95) 70%)',
          }}
        />

        {/* Studio Logo Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            marginBottom: '30px',
            position: 'relative',
            zIndex: 10,
          }}
        >
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '14px',
              background: '#2563eb',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
              fontWeight: '900',
            }}
          >
            P
          </div>
          <span
            style={{
              fontSize: '36px',
              fontWeight: '800',
              letterSpacing: '-0.02em',
              color: '#ffffff',
            }}
          >
            PrimeForge
          </span>
        </div>

        {/* Main Headline */}
        <div
          style={{
            fontSize: '52px',
            fontWeight: '900',
            textAlign: 'center',
            lineHeight: '1.15',
            maxWidth: '900px',
            marginBottom: '24px',
            position: 'relative',
            zIndex: 10,
            color: '#ffffff',
          }}
        >
          Give Your Brand the Digital Infrastructure It Deserves.
        </div>

        {/* Sub-Headline */}
        <div
          style={{
            fontSize: '22px',
            color: '#a1a1aa',
            textAlign: 'center',
            maxWidth: '780px',
            lineHeight: '1.5',
            marginBottom: '40px',
            position: 'relative',
            zIndex: 10,
          }}
        >
          Custom High-Speed Next.js 16 Web Apps · Autonomous Gemini AI Agents · Modern Search Optimization
        </div>

        {/* Tech Pills */}
        <div
          style={{
            display: 'flex',
            gap: '12px',
            position: 'relative',
            zIndex: 10,
          }}
        >
          <div
            style={{
              padding: '10px 20px',
              borderRadius: '30px',
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)',
              fontSize: '16px',
              fontWeight: '600',
              color: '#60a5fa',
            }}
          >
            Next.js 16
          </div>
          <div
            style={{
              padding: '10px 20px',
              borderRadius: '30px',
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)',
              fontSize: '16px',
              fontWeight: '600',
              color: '#34d399',
            }}
          >
            Gemini AI Agents
          </div>
          <div
            style={{
              padding: '10px 20px',
              borderRadius: '30px',
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)',
              fontSize: '16px',
              fontWeight: '600',
              color: '#fbbf24',
            }}
          >
            AEO & GEO Search
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
