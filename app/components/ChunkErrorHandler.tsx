'use client';

import { useEffect } from 'react';

export default function ChunkErrorHandler() { //problem with PWA   //  "/_next/static/*", // Next.js bundles
    useEffect(() => {
        const handler = (e: any) => {
            if (e?.message?.includes('ChunkLoadError')) {
                console.warn('Chunk load failed, reloading...');
                window.location.reload();
            }
        };

        window.addEventListener('error', handler);

        return () => {
            window.removeEventListener('error', handler);
        };
    }, []);

    return null;
}