import { Design, DesignRequest, APIResponse } from '../types/design';

export const designService = {
  /**
   * Submit a design request to the server
   */
  submitRequest: async (request: Omit<DesignRequest, 'id' | 'submittedAt'>): Promise<APIResponse<DesignRequest>> => {
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || 'Failed to submit request',
          error: data.error,
        };
      }

      return {
        success: true,
        message: data.message || 'Request submitted successfully',
        data: data.data,
      };
    } catch (error) {
      return {
        success: false,
        message: 'An error occurred while submitting your request',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },

  /**
   * Generate demo URL for iframe preview
   */
  getDemoUrl: (design: Design): string => {
    return design.demoPath?.startsWith('/')
      ? design.demoPath
      : `/demos/${design.slug}/index.html`;
  },

  /**
   * Get preview image URL with fallback
   */
  getPreviewImageUrl: (design: Design): string => {
    return design.previewImage || '/designs/placeholder.jpg';
  },

  /**
   * Format design title for display
   */
  formatDesignTitle: (title: string): string => {
    return title.charAt(0).toUpperCase() + title.slice(1);
  },
};
