'use client';

import { useState, useCallback } from 'react';
import { FormData, DesignRequest, ThemeCustomization } from '../../src/types/design';
import { validateForm, sanitizeFormData } from '../../src/lib/formValidator';
import { designService } from '../../src/lib/designService';

interface DesignFormProps {
  designSlug: string;
  designTitle: string;
  onSuccess?: () => void;
}

interface ValidationState {
  name?: string;
  email?: string;
  message?: string;
}

export const DesignForm = ({
  designSlug,
  designTitle,
  onSuccess,
}: DesignFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [themeCustomization, setThemeCustomization] = useState<ThemeCustomization>({});
  const [errors, setErrors] = useState<ValidationState>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
      // Clear error for this field when user starts typing
      if (errors[name as keyof ValidationState]) {
        setErrors(prev => ({ ...prev, [name]: undefined }));
      }
    },
    [errors]
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitStatus({ type: null, message: '' });

    // Validate form
    const validationErrors = validateForm(formData);
    if (validationErrors.length > 0) {
      const errorMap = validationErrors.reduce(
        (acc, err) => ({ ...acc, [err.field]: err.message }),
        {} as ValidationState
      );
      setErrors(errorMap);
      return;
    }

    setIsSubmitting(true);

    try {
      const sanitized = sanitizeFormData(formData);
      const request: Omit<DesignRequest, 'id' | 'submittedAt'> = {
        name: sanitized.name,
        email: sanitized.email,
        message: sanitized.message,
        designSlug,
        designTitle,
        themeCustomization: Object.keys(themeCustomization).length > 0 ? themeCustomization : undefined,
      };

      const response = await designService.submitRequest(request);

      if (response.success) {
        setSubmitStatus({ type: 'success', message: response.message });
        setFormData({ name: '', email: '', message: '' });
        setThemeCustomization({});
        setErrors({});
        
        if (onSuccess) {
          // Call success callback after short delay
          setTimeout(onSuccess, 1500);
        }
      } else {
        setSubmitStatus({
          type: 'error',
          message: response.error || response.message,
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'An unexpected error occurred. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Status Messages */}
      {submitStatus.type && (
        <div
          className={`rounded-lg p-4 ${
            submitStatus.type === 'success'
              ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
              : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
          }`}
        >
          <p
            className={`text-sm font-semibold ${
              submitStatus.type === 'success'
                ? 'text-green-700 dark:text-green-400'
                : 'text-red-700 dark:text-red-400'
            }`}
          >
            {submitStatus.message}
          </p>
        </div>
      )}

      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
          Your Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          disabled={isSubmitting}
          className={`w-full px-4 py-2 rounded-lg border transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
            errors.name
              ? 'border-red-500 dark:border-red-500 bg-red-50 dark:bg-red-900/10'
              : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800'
          } text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          placeholder="John Doe"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          disabled={isSubmitting}
          className={`w-full px-4 py-2 rounded-lg border transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
            errors.email
              ? 'border-red-500 dark:border-red-500 bg-red-50 dark:bg-red-900/10'
              : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800'
          } text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          placeholder="john@example.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
        )}
      </div>

      {/* Message Field */}
      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          disabled={isSubmitting}
          rows={5}
          className={`w-full px-4 py-2 rounded-lg border transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
            errors.message
              ? 'border-red-500 dark:border-red-500 bg-red-50 dark:bg-red-900/10'
              : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800'
          } text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical`}
          placeholder="Tell us about your project requirements..."
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message}</p>
        )}
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          {formData.message.length}/1000 characters
        </p>
      </div>

      {/* Theme Customization */}
      <div className="border-t border-slate-300 dark:border-slate-600 pt-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
          Optional: Customize Theme
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
          Let us know any specific theme preferences (colors, typography, spacing, etc.)
        </p>
        
        <div className="grid md:grid-cols-2 gap-4">
          {/* Primary Color */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
              Primary Color
            </label>
            <input
              type="color"
              disabled={isSubmitting}
              value={themeCustomization.primaryColor || '#3B82F6'}
              onChange={(e) => setThemeCustomization({...themeCustomization, primaryColor: e.target.value})}
              className="w-full h-10 rounded-lg border border-slate-300 dark:border-slate-600 cursor-pointer disabled:opacity-50"
            />
          </div>

          {/* Secondary Color */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
              Secondary Color
            </label>
            <input
              type="color"
              disabled={isSubmitting}
              value={themeCustomization.secondaryColor || '#10B981'}
              onChange={(e) => setThemeCustomization({...themeCustomization, secondaryColor: e.target.value})}
              className="w-full h-10 rounded-lg border border-slate-300 dark:border-slate-600 cursor-pointer disabled:opacity-50"
            />
          </div>

          {/* Typography */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
              Typography
            </label>
            <select
              disabled={isSubmitting}
              value={themeCustomization.typography || 'balanced'}
              onChange={(e) => setThemeCustomization({...themeCustomization, typography: e.target.value})}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white disabled:opacity-50"
            >
              <option value="balanced">Balanced</option>
              <option value="display">Display</option>
              <option value="text">Text</option>
            </select>
          </div>

          {/* Border Radius */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
              Border Radius
            </label>
            <select
              disabled={isSubmitting}
              value={themeCustomization.borderRadius || 'mild'}
              onChange={(e) => setThemeCustomization({...themeCustomization, borderRadius: e.target.value})}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white disabled:opacity-50"
            >
              <option value="sharp">Sharp</option>
              <option value="mild">Mild</option>
              <option value="rounded">Rounded</option>
              <option value="full">Full</option>
            </select>
          </div>

          {/* Shadow Intensity */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
              Shadow Intensity
            </label>
            <select
              disabled={isSubmitting}
              value={themeCustomization.shadowIntensity || 'medium'}
              onChange={(e) => setThemeCustomization({...themeCustomization, shadowIntensity: e.target.value})}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white disabled:opacity-50"
            >
              <option value="none">None</option>
              <option value="subtle">Subtle</option>
              <option value="medium">Medium</option>
              <option value="bold">Bold</option>
            </select>
          </div>

          {/* Component Size */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
              Component Size
            </label>
            <select
              disabled={isSubmitting}
              value={themeCustomization.componentSize || 'medium'}
              onChange={(e) => setThemeCustomization({...themeCustomization, componentSize: e.target.value})}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white disabled:opacity-50"
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 mt-6"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <span className="inline-block h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
            Submitting...
          </span>
        ) : (
          'Submit Request'
        )}
      </button>

      {/* Info Text */}
      <p className="text-xs text-slate-600 dark:text-slate-400 text-center">
        We'll review your request and get back to you within 24 hours.
      </p>
    </form>
  );
};
