import { VTONRequest, VTONResponse, VTONStatus, VTONError } from '../types/vton';

export class VTONService {
  private readonly API_URL = 'https://api-inference.huggingface.co/models/sayakpaul/sd-model-finetuned-lora-t4';
  private readonly API_KEY = process.env.REACT_APP_HUGGINGFACE_API_KEY;
  private processingJobs: Map<string, VTONStatus> = new Map();

  async processVTON(request: VTONRequest): Promise<VTONResponse> {
    try {
      if (!this.API_KEY) {
        throw {
          code: 'API_KEY_MISSING',
          message: 'Hugging Face API key is not configured'
        } as VTONError;
      }

      const jobId = this.generateJobId();
      
      // Initialize job status
      this.processingJobs.set(jobId, {
        jobId,
        status: 'pending',
        progress: 0
      });

      // Start processing in background
      this.processWithAPI(jobId, request);

      return {
        success: true,
        jobId,
        message: 'VTON processing started'
      };
    } catch (error) {
      const vtonError: VTONError = {
        code: 'PROCESSING_ERROR',
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        details: error instanceof Error ? error.stack : undefined
      };
      throw vtonError;
    }
  }

  async checkVtonStatus(jobId: string): Promise<VTONStatus> {
    const status = this.processingJobs.get(jobId);
    if (!status) {
      throw {
        code: 'JOB_NOT_FOUND',
        message: `No job found with ID: ${jobId}`
      } as VTONError;
    }
    return status;
  }

  private async processWithAPI(jobId: string, request: VTONRequest): Promise<void> {
    const status = this.processingJobs.get(jobId)!;
    status.status = 'processing';

    try {
      // Convert images to base64
      const personImageBase64 = await this.fileToBase64(request.personImage);
      const garmentImageBase64 = await this.fileToBase64(request.garmentImage);

      // Prepare API request
      const apiRequest = {
        inputs: {
          person_image: personImageBase64,
          garment_image: garmentImageBase64,
          ...request.options
        }
      };

      // Make API request
      const response = await fetch(this.API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(apiRequest)
      });

      if (!response.ok) {
        throw {
          code: 'API_ERROR',
          message: `API request failed with status ${response.status}`,
          details: await response.text()
        } as VTONError;
      }

      // Get the generated image from response
      const imageBlob = await response.blob();
      const resultImageUrl = URL.createObjectURL(imageBlob);

      // Update job status
      status.status = 'completed';
      status.progress = 100;
      status.resultImage = resultImageUrl;

      console.log(`VTON processing completed for job ${jobId}`);
    } catch (error) {
      status.status = 'failed';
      status.error = error as VTONError;
      console.error(`VTON processing failed for job ${jobId}:`, error);
    }
  }

  private async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  private generateJobId(): string {
    return `vton-job-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
} 