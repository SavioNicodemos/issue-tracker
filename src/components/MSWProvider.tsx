'use client';

import { useEffect } from 'react';

export default function MSWProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_DEMO_MODE !== 'true') return;

    import('@/mocks/browser').then(({ worker }) => {
      worker.start({ onUnhandledRequest: 'bypass' });
    });
  }, []);

  return <>{children}</>;
}
