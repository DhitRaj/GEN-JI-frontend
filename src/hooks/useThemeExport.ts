'use client';

import { useCallback } from 'react';
import { ThemeConfig, ExportFormat } from '../types/theme';
import { exportAsJS, exportAsCSS, exportAsTokens, exportAsTailwind } from '../lib/exportFormats';

export const useThemeExport = () => {
  const downloadFile = useCallback((content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  }, []);

  const exportTheme = useCallback((config: ThemeConfig, format: ExportFormat) => {
    let content = '';
    let filename = '';
    let mimeType = '';

    switch (format) {
      case 'js':
        content = exportAsJS(config);
        filename = 'theme-config.js';
        mimeType = 'text/javascript';
        break;
      case 'css':
        content = exportAsCSS(config);
        filename = 'theme.css';
        mimeType = 'text/css';
        break;
      case 'tokens':
        content = exportAsTokens(config);
        filename = 'design-tokens.json';
        mimeType = 'application/json';
        break;
      case 'tailwind':
        content = exportAsTailwind(config);
        filename = 'tailwind.config.js';
        mimeType = 'text/javascript';
        break;
    }

    if (content && filename) {
      downloadFile(content, filename, mimeType);
    }
  }, [downloadFile]);

  const copyToClipboard = useCallback((config: ThemeConfig, format: ExportFormat) => {
    let content = '';

    switch (format) {
      case 'js':
        content = exportAsJS(config);
        break;
      case 'css':
        content = exportAsCSS(config);
        break;
      case 'tokens':
        content = exportAsTokens(config);
        break;
      case 'tailwind':
        content = exportAsTailwind(config);
        break;
    }

    if (content) {
      navigator.clipboard.writeText(content);
    }
  }, []);

  return { exportTheme, copyToClipboard };
};
