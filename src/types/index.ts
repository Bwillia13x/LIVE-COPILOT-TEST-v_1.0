// src/types/index.ts
export * from './apiTypes';
export * from './chartTypes';

export interface ToastOptions {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  showRetry?: boolean;
  onRetry?: () => void;
}
