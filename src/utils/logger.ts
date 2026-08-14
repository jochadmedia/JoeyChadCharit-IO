// Simple logging utility for demonstration
// In production, you might use a service like Sentry, LogRocket, or Datadog

export const logger = {
  log: (message: string, data?: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[LOG] ${message}`, data || '');
    }
    // In production, you could send to external logging service
    // Example: fetch('/api/log', { method: 'POST', body: JSON.stringify({ message, data }) });
  },

  error: (message: string, error?: any) => {
    console.error(`[ERROR] ${message}`, error || '');
    // In production, send to error tracking service
    // Example: Sentry.captureException(error || new Error(message));
  },

  warn: (message: string, data?: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`[WARN] ${message}`, data || '');
    }
  },

  info: (message: string, data?: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.info(`[INFO] ${message}`, data || '');
    }
  },
};

export default logger;