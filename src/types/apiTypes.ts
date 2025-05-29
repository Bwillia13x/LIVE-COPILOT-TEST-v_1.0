// src/types/apiTypes.ts
import { ChartSuggestion } from './chartTypes';

export interface AIResponse {
  polishedNoteText: string;
  chartSuggestion?: ChartSuggestion;
}

export interface ContentAnalysis {
  topics: string[];
  keyPhrases: string[];
  sentiment: {
    score: number;
    confidence: number;
    label: 'positive' | 'negative' | 'neutral';
  };
  contentType: string;
  urgencyLevel: 'low' | 'medium' | 'high';
  actionItems: string[];
  chartData?: {
    topics?: Record<string, number>;
    sentiment_breakdown?: Record<string, number>;
    word_frequency?: Record<string, number>;
  };
}
