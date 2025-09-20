interface HuggingFaceResponse {
  label: string;
  score: number;
}

interface DetectionResult {
  isFake: boolean;
  confidence: number;
  label: string;
}

export class FakeNewsDetectionService {
  private readonly apiUrl = "https://router.huggingface.co/hf-inference/models/Pulk17/Fake-News-Detection";
  private readonly hfToken: string;

  constructor() {
    this.hfToken = process.env.HF_TOKEN || '';
    if (!this.hfToken) {
      throw new Error('HF_TOKEN environment variable is required');
    }
  }

  async detectFakeNews(text: string): Promise<DetectionResult> {
    try {
      const response = await fetch(this.apiUrl, {
        headers: {
          Authorization: `Bearer ${this.hfToken}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ inputs: text }),
      });

      if (!response.ok) {
        throw new Error(`Hugging Face API error: ${response.status} ${response.statusText}`);
      }

      const result: any = await response.json();
      
      // Debug: Log the raw response from Hugging Face
      console.log('🔍 Raw Hugging Face Response:', JSON.stringify(result, null, 2));
      
      // The model returns a nested array, we need to get the first array element
      const predictions = result[0];
      
      if (!predictions || !Array.isArray(predictions)) {
        throw new Error('No prediction result received from the model');
      }
      
      // Find the prediction with the highest confidence
      const prediction = predictions.reduce((max, current) => 
        current.score > max.score ? current : max
      );
      
      // Debug: Log the prediction details
      console.log('📊 Prediction Details:', {
        label: prediction.label,
        score: prediction.score,
        labelType: typeof prediction.label
      });
      
      const isFake = prediction.label === 'LABEL_0';
      const readableLabel = prediction.label === 'LABEL_0' ? 'FAKE' : 'REAL';
      
      // Debug: Log our interpretation
      console.log('🎯 Our Interpretation:', {
        isFake,
        readableLabel,
        confidence: prediction.score,
        confidencePercent: (prediction.score * 100).toFixed(1) + '%'
      });
      
      return {
        isFake,
        confidence: prediction.score,
        label: readableLabel
      };
    } catch (error) {
      console.error('Error in fake news detection:', error);
      throw new Error('Failed to analyze text for fake news detection');
    }
  }
}
