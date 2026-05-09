'use client';

import { usePathname } from 'next/navigation';
import Beams from './ui/beams';

export function PageBackground() {
  const pathname = usePathname();

    const isExcluded = 
    pathname === '/' || 
    pathname.startsWith('/dashboard') || 
    pathname.startsWith('/api') ||
    pathname.startsWith('/login') ||
    pathname.startsWith('/signup') ||
    pathname.startsWith('/onboarding');

  if (isExcluded) {
    return null;
  }

  // Dashboard pages might have their own layout, but if we only want "landing pages"
  // User says "all the landing pages except the main / landing page"
  // Is it okay if it appears on dashboard pages? The prompt says "all the landing pages".
  // The app directory has dashboard, docs, auth flows...
  // Usually, a site-wide background might affect dashboards negatively. Let's see what layouts we have.

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none opacity-40">
      <Beams
        beamWidth={2}
        beamHeight={15}
        beamNumber={12}
        lightColor="#ffffff"
        speed={2}
        noiseIntensity={1.75}
        scale={0.2}
        rotation={0}
      />
    </div>
  );
}
