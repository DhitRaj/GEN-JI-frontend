'use client';

import { useEffect, useState } from 'react';
import { Design } from '../../src/types/design';
import { designService } from '../../src/lib/designService';

interface DesignPreviewProps {
  design: Design;
  isLoading?: boolean;
}

export const DesignPreview = ({ design, isLoading = false }: DesignPreviewProps) => {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const demoUrl = designService.getDemoUrl(design);

  useEffect(() => {
    setIframeLoaded(false);
  }, [design.slug]);

  return (
    <div className="w-full rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden bg-white dark:bg-slate-800">
      {/* Loading Skeleton */}
      {isLoading || !iframeLoaded ? (
        <div className="w-full h-96 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 animate-pulse flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block h-8 w-8 rounded-full border-4 border-blue-200 border-t-blue-600 dark:border-blue-900 dark:border-t-blue-400 animate-spin" />
            <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm">Loading preview...</p>
          </div>
        </div>
      ) : null}

      {/* iframe */}
      <iframe
        src={demoUrl}
        title={`${design.title} Preview`}
        className={`w-full h-96 border-0 ${iframeLoaded ? 'block' : 'hidden'}`}
        onLoad={() => setIframeLoaded(true)}
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
      />

      {/* Fallback Error Message */}
      {!iframeLoaded && !isLoading && (
        <div className="w-full h-96 bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-6">
          <div className="text-center">
            <p className="text-slate-600 dark:text-slate-400">
              Unable to load preview. The design demo might not be available.
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">
              Path: {demoUrl}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
