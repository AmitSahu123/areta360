import { VTONRequest, VTONResponse, VTONStatus, VTONError } from '../types/vton';

export class MockVTONService {
  private processingJobs: Map<string, VTONStatus> = new Map();
  private mockProcessingTime = 2000; // 2 seconds

  async processVTON(request: VTONRequest): Promise<VTONResponse> {
    try {
      const jobId = this.generateJobId();
      
      // Initialize job status
      this.processingJobs.set(jobId, {
        jobId,
        status: 'pending',
        progress: 0
      });

      // Start processing in background
      this.simulateProcessing(jobId, request);

      return {
        success: true,
        jobId,
        message: 'VTON processing started'
      };
    } catch (error) {
      const vtonError = error as VTONError;
      throw vtonError;
    }
  }

  async checkVtonStatus(jobId: string): Promise<VTONStatus> {
    const status = this.processingJobs.get(jobId);
    if (!status) {
      throw {
        code: 'JOB_NOT_FOUND',
        message: `No job found with ID: ${jobId}`
      };
    }
    return status;
  }

  private async simulateProcessing(jobId: string, request: VTONRequest): Promise<void> {
    const status = this.processingJobs.get(jobId)!;
    status.status = 'processing';

    // Simulate progress updates
    const progressInterval = setInterval(() => {
      if (status.progress < 90) {
        status.progress += 10;
      }
    }, this.mockProcessingTime / 10);

    // Simulate completion after mockProcessingTime
    setTimeout(() => {
      clearInterval(progressInterval);
      
      // Create mock result image URL
      const mockResultImage = URL.createObjectURL(new Blob(['mock-image-data'], { type: 'image/png' }));
      
      status.status = 'completed';
      status.progress = 100;
      status.resultImage = mockResultImage;
      
      console.log(`Mock VTON processing completed for job ${jobId}`);
    }, this.mockProcessingTime);
  }

  private generateJobId(): string {
    return `mock-job-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
} 