'use client';

import Link from 'next/link';
import { Design } from '../../src/types/design';
import { designService } from '../../src/lib/designService';

interface DesignCardProps {
  design: Design;
}

export const DesignCard = ({ design }: DesignCardProps) => {
  return (
    <div className="rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden bg-white dark:bg-slate-800 transition-all duration-200 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-500">
      {/* Preview Image */}
      <div className="relative w-full h-48 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 overflow-hidden group">
        <img
          src={designService.getPreviewImageUrl(design)}
          alt={design.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-bold text-lg text-slate-900 dark:text-white">{design.title}</h3>
          <span className="text-xs font-semibold uppercase px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 whitespace-nowrap">
            {design.category}
          </span>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
          {design.description}
        </p>

        {/* Features */}
        {design.features && design.features.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {design.features.slice(0, 3).map(feature => (
              <span
                key={feature}
                className="text-xs px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
              >
                {feature}
              </span>
            ))}
          </div>
        )}

        {/* CTA Buttons */}
        <div className="flex gap-2">
          <Link
            href={`/preview/${design.slug}`}
            className="flex-1 px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white text-center font-semibold text-sm transition-colors hover:bg-slate-200 dark:hover:bg-slate-600"
          >
            Preview
          </Link>
          <Link
            href={`/select/${design.slug}`}
            className="flex-1 px-3 py-2 rounded-lg bg-blue-600 text-white text-center font-semibold text-sm transition-colors hover:bg-blue-700"
          >
            Select
          </Link>
        </div>
      </div>
    </div>
  );
};
