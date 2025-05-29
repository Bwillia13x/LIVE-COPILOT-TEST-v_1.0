import { GoogleGenAI } from '@google/genai';
import { AIResponse, ContentAnalysis } from '../types'; // Or specific paths

const MODEL_NAME = 'gemini-2.5-flash-preview-04-17';

export async function callGeminiForPolishing(genAI: GoogleGenAI, text: string): Promise<AIResponse | null> {
  if (!genAI) {
    console.log('❌ callGeminiForPolishing: genAI not available');
    return null;
  }
  
  console.log('📞 callGeminiForPolishing called with text length:', text.length);
  
  const startTime = performance.now();
  
  try {
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    console.log('📞 Got Gemini model:', MODEL_NAME);
    
    const prompt = `
      Please analyze and polish the following transcribed text. Return a JSON response with the following structure:
      {
        "polishedNoteText": "Your polished markdown text here",
        "chartSuggestion": {
          "type": "bar|pie|line|doughnut",
          "title": "Chart title",
          "data": {
            "labels": ["Label1", "Label2", ...],
            "datasets": [{
              "label": "Dataset name",
              "data": [value1, value2, ...],
              "backgroundColor": ["color1", "color2", ...]
            }]
          },
          "description": "What this chart represents"
        }
      }
      
      Guidelines:
      - Fix grammar, spelling, and punctuation
      - Improve sentence structure and flow
      - Add appropriate markdown formatting (headers, lists, emphasis)
      - If the content contains numerical data, comparisons, categories, or trends, suggest a relevant chart
      - For charts, extract meaningful data from the text and suggest appropriate visualizations
      - Use vibrant, accessible colors for charts
      
      Transcribed text: "${text}"
    `;
    
    console.log('📞 Sending prompt to Gemini...');
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    console.log('📞 Raw Gemini response:', responseText);
    
    // Try to extract JSON from the response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      console.log('📞 Found JSON in response:', jsonMatch[0]);
      const parsedResponse = JSON.parse(jsonMatch[0]);
      
      // Track performance
      // const duration = performance.now() - startTime;
      // this.performanceMetrics.apiCallDuration.push(duration); // Cannot access this.performanceMetrics here
      console.log('📞 API call completed in', performance.now() - startTime, 'ms');
      
      return parsedResponse;
    } else {
      console.log('📞 No JSON found in response, using as polished text');
      // Fallback: use the response as polished text
      return {
        polishedNoteText: responseText,
        chartSuggestion: null
      };
    }
  } catch (error) {
    console.error('❌ Gemini API call failed:', error);
    throw error;
  }
}

export async function callGeminiForInsights(genAI: GoogleGenAI, text: string): Promise<ContentAnalysis | null> {
  if (!genAI) {
    console.log('❌ callGeminiForInsights: genAI not available');
    return null;
  }
  
  console.log('📞 callGeminiForInsights called with text length:', text.length);
  
  try {
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    console.log('📞 Got Gemini model for insights:', MODEL_NAME);
    
    const prompt = `
      Analyze the following text and return insights in JSON format:
      {
        "topics": ["topic1", "topic2", ...],
        "keyPhrases": ["phrase1", "phrase2", ...],
        "sentiment": {
          "score": number_between_-1_and_1,
          "confidence": number_between_0_and_1,
          "label": "positive|negative|neutral"
        },
        "contentType": "meeting|lecture|notes|brainstorm|general",
        "urgencyLevel": "low|medium|high",
        "actionItems": ["action1", "action2", ...],
        "chartData": {
          "topics": {"topic1": count1, "topic2": count2},
          "sentiment_breakdown": {"positive": count, "negative": count, "neutral": count},
          "word_frequency": {"word1": count1, "word2": count2}
        }
      }
      
      Text to analyze: "${text}"
    `;
    
    console.log('📞 Sending insights prompt to Gemini...');
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    console.log('📞 Raw Gemini insights response:', responseText);
    
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      console.log('📞 Found JSON in insights response:', jsonMatch[0]);
      return JSON.parse(jsonMatch[0]);
    } else {
      console.log('❌ No JSON found in insights response');
    }
  } catch (error) {
    console.error('❌ Gemini insights call failed:', error);
    throw error;
  }
  
  return null;
}
