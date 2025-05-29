import { Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale, BarController, BarElement, PieController, ArcElement, Legend, Tooltip, Title } from 'chart.js';
import { ChartSuggestion, ToastOptions } from '../types';

let chartIdCounter = 0;
let activeAiChartInstances: Chart[] = [];

// --- Utility Functions ---
export function generateChartColors(count: number): string[] {
  const colors = [
    '#3b82f6', // blue
    '#10b981', // emerald
    '#f59e0b', // amber
    '#ef4444', // red
    '#8b5cf6', // violet
    '#06b6d4', // cyan
    '#84cc16', // lime
    '#f97316', // orange
    '#ec4899', // pink
    '#6366f1'  // indigo
  ];
  
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(colors[i % colors.length]);
  }
  return result;
}

// --- Chart Management Functions ---
export function clearActiveCharts(
  aiChartDisplayArea: HTMLDivElement | null, 
  showToast?: (options: ToastOptions) => void
) {
  activeAiChartInstances.forEach(chart => {
    chart.destroy();
  });
  activeAiChartInstances = [];
  
  if (aiChartDisplayArea) {
    aiChartDisplayArea.innerHTML = ''; // Clear the display area
  }
  
  // Optionally, provide feedback that charts were cleared
  if (showToast) {
    showToast({
      type: 'info',
      title: 'Charts Cleared',
      message: 'Previous charts have been removed.'
    });
  }
  console.log('🧹 Charts cleared and display area updated.');
}

// --- Chart Creation Functions ---
export async function generateChartsFromAI(
  aiChartDisplayArea: HTMLDivElement,
  showToast: (options: ToastOptions) => void,
  chartSuggestion: ChartSuggestion
): Promise<void> {
  console.log('📊 generateChartsFromAI() called with:', chartSuggestion);
  
  if (!chartSuggestion || !aiChartDisplayArea) {
    console.log('⚠️ No chart suggestion or chart display area not found');
    return;
  }
  
  // It might be good practice to clear charts related to this specific display area if multiple areas are used in the future.
  // For now, assuming aiChartDisplayArea is the primary one for these AI charts.
  // clearActiveCharts(aiChartDisplayArea); // Decided against auto-clearing here, let caller manage.

  const chartId = `ai-chart-${chartIdCounter++}`;
  const chartContainer = document.createElement('div');
  chartContainer.className = 'chart-container';
  
  chartContainer.innerHTML = `
    <div class="chart-header">
      <h4>${chartSuggestion.title || 'AI Generated Chart'}</h4>
      <p class="chart-description">${chartSuggestion.description || ''}</p>
    </div>
    <canvas id="${chartId}"></canvas>
  `;
  
  aiChartDisplayArea.appendChild(chartContainer);
  
  const canvas = chartContainer.querySelector(`#${chartId}`) as HTMLCanvasElement;
  if (!canvas) {
    console.error('❌ Canvas element not found for AI chart:', chartId);
    return;
  }
  
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    console.error('❌ Canvas context not available for AI chart');
    return;
  }
  
  const chartConfig = {
    type: chartSuggestion.type || 'bar',
    data: chartSuggestion.data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: chartSuggestion.title || 'AI Generated Chart'
        },
        legend: {
          display: true,
          position: 'top' as const
        }
      }
    }
  };
  
  try {
    const chart = new Chart(ctx, chartConfig as any); // Use 'as any' to bypass strict Chart.js config typing for now
    activeAiChartInstances.push(chart);
    console.log('✅ AI Chart created successfully:', chartId);
  } catch (chartError) {
    console.error('❌ Failed to create AI Chart.js instance:', chartError);
    showToast({
      type: 'error',
      title: 'Chart Error',
      message: `Could not create AI chart: ${(chartError as Error).message}`
    });
  }
}

export async function testChartWithoutAI(
  aiChartDisplayArea: HTMLDivElement,
  showToast: (options: ToastOptions) => void
): Promise<void> {
  console.log('🧪 Testing Chart.js directly without AI...');
  
  if (!aiChartDisplayArea) {
    console.error('❌ Chart display area not found for testChartWithoutAI!');
    showToast({ type: 'error', title: 'Test Error', message: 'Chart display area not found.' });
    return;
  }
  
  clearActiveCharts(aiChartDisplayArea); // Clear before drawing a new one in this test
  
  const chartId = `direct-chart-${chartIdCounter++}`;
  const chartContainer = document.createElement('div');
  chartContainer.className = 'chart-container';
  chartContainer.innerHTML = `
    <div class="chart-header">
      <h4>Direct Chart Test</h4>
      <p class="chart-description">Testing Chart.js directly without AI service</p>
    </div>
    <canvas id="${chartId}"></canvas>
  `;
  
  aiChartDisplayArea.appendChild(chartContainer);
  
  const canvas = chartContainer.querySelector(`#${chartId}`) as HTMLCanvasElement;
  if (!canvas) {
    console.error('❌ Canvas element not found for direct test chart!');
    return;
  }
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    console.error('❌ Canvas context not available for direct test chart!');
    return;
  }
  
  try {
    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: 'Sample Data',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 
            'rgba(255, 205, 86, 0.2)', 'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)',
            'rgba(255, 205, 86, 1)', 'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: { y: { beginAtZero: true } }
      }
    });
    activeAiChartInstances.push(chart);
    console.log('✅ Direct Chart.js test successful!');
    showToast({ type: 'success', title: 'Chart Test Success', message: 'Chart.js is working! Check Raw tab.'});
  } catch (error) {
    console.error('❌ Direct Chart.js test failed:', error);
    showToast({ type: 'error', title: 'Chart Test Failed', message: `Chart.js test failed: ${(error as Error).message}` });
  }
}

export async function createTopicChart(
  aiChartDisplayArea: HTMLDivElement,
  topicsData: Record<string, number>
): Promise<void> {
  const chartId = `topics-chart-${chartIdCounter++}`;
  const chartContainer = document.createElement('div');
  chartContainer.className = 'chart-container';
  chartContainer.innerHTML = `
    <div class="chart-header">
      <h4>Topic Distribution</h4>
      <p class="chart-description">Main topics identified in your transcription</p>
    </div>
    <canvas id="${chartId}"></canvas>
  `;
  aiChartDisplayArea.appendChild(chartContainer);
  const canvas = chartContainer.querySelector(`#${chartId}`) as HTMLCanvasElement;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const labels = Object.keys(topicsData);
  const data = Object.values(topicsData);
  const colors = generateChartColors(labels.length);

  const chart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [{
        label: 'Topic Frequency',
        data: data,
        backgroundColor: colors,
        borderWidth: 2,
        borderColor: '#ffffff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: { display: true, text: 'Topic Distribution' },
        legend: { display: true, position: 'bottom' }
      }
    }
  });
  activeAiChartInstances.push(chart);
}

export async function createSentimentChart(
  aiChartDisplayArea: HTMLDivElement,
  sentimentData: Record<string, number>
): Promise<void> {
  const chartId = `sentiment-chart-${chartIdCounter++}`;
  const chartContainer = document.createElement('div');
  chartContainer.className = 'chart-container';
  chartContainer.innerHTML = `
    <div class="chart-header">
      <h4>Sentiment Analysis</h4>
      <p class="chart-description">Emotional tone breakdown of your content</p>
    </div>
    <canvas id="${chartId}"></canvas>
  `;
  aiChartDisplayArea.appendChild(chartContainer);
  const canvas = chartContainer.querySelector(`#${chartId}`) as HTMLCanvasElement;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Object.keys(sentimentData),
      datasets: [{
        label: 'Sentiment Count',
        data: Object.values(sentimentData),
        backgroundColor: ['#10b981', '#ef4444', '#f59e0b'], // positive, negative, neutral
        borderRadius: 8,
        borderSkipped: false
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: { display: true, text: 'Sentiment Analysis' },
        legend: { display: false }
      },
      scales: { y: { beginAtZero: true } }
    }
  });
  activeAiChartInstances.push(chart);
}

export async function createWordFrequencyChart(
  aiChartDisplayArea: HTMLDivElement,
  wordData: Record<string, number>
): Promise<void> {
  const chartId = `words-chart-${chartIdCounter++}`;
  const chartContainer = document.createElement('div');
  chartContainer.className = 'chart-container';
  chartContainer.innerHTML = `
    <div class="chart-header">
      <h4>Key Words</h4>
      <p class="chart-description">Most frequently used words in your transcription</p>
    </div>
    <canvas id="${chartId}"></canvas>
  `;
  aiChartDisplayArea.appendChild(chartContainer);
  const canvas = chartContainer.querySelector(`#${chartId}`) as HTMLCanvasElement;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const sortedWords = Object.entries(wordData).sort(([,a], [,b]) => b - a).slice(0, 10);
  const labels = sortedWords.map(([word]) => word);
  const data = sortedWords.map(([,count]) => count);

  const chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Frequency',
        data: data,
        backgroundColor: '#3b82f6',
        borderRadius: 4,
        borderSkipped: false
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      plugins: {
        title: { display: true, text: 'Most Frequent Words' },
        legend: { display: false }
      },
      scales: { x: { beginAtZero: true } }
    }
  });
  activeAiChartInstances.push(chart);
}

export async function generateSampleCharts(
  aiChartDisplayArea: HTMLDivElement,
  showToast: (options: ToastOptions) => void,
): Promise<void> {
  console.log('📊 Generating sample charts with predefined data...');
  if (!aiChartDisplayArea) {
    console.error('❌ Chart display area not found for sample charts!');
    showToast({ type: 'error', title: 'Sample Chart Error', message: 'Chart display area not found.'});
    return;
  }

  clearActiveCharts(aiChartDisplayArea); // Clear before drawing new samples

  const sampleChartSuggestions: ChartSuggestion[] = [
    {
      type: 'bar',
      title: 'Quarterly Sales Performance',
      description: 'Sample sales data showing quarterly performance',
      data: {
        labels: ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024'],
        datasets: [{
          label: 'Sales ($K)',
          data: [120, 190, 300, 500],
          backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0'],
          borderColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0'],
          borderWidth: 1
        }]
      }
    },
    {
      type: 'pie',
      title: 'Market Share Distribution',
      description: 'Sample market share breakdown by category',
      data: {
        labels: ['Product A', 'Product B', 'Product C', 'Product D'],
        datasets: [{
          label: 'Market Share (%)',
          data: [35, 25, 20, 20],
          backgroundColor: ['#ff9999', '#66b3ff', '#99ff99', '#ffcc99'],
          borderWidth: 2
        }]
      }
    },
    {
      type: 'line',
      title: 'Growth Trend Analysis',
      description: 'Sample growth trend over time',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Growth Rate (%)',
          data: [5, 8, 12, 15, 18, 22],
          borderColor: '#36a2eb',
          backgroundColor: 'rgba(54, 162, 235, 0.1)',
          fill: true,
          tension: 0.4
        }]
      }
    }
  ];

  for (const suggestion of sampleChartSuggestions) {
    // Since generateChartsFromAI is now in this module, we call it directly.
    // It doesn't need showToast for internal calls usually, unless specifically designed for feedback per chart.
    // For this case, we'll pass a minimal showToast or rely on its own console logs.
    await generateChartsFromAI(aiChartDisplayArea, showToast, suggestion);
  }

  showToast({
    type: 'success',
    title: 'Sample Charts Generated',
    message: `Generated ${sampleChartSuggestions.length} sample charts successfully!`
  });
}
