export interface VTONRequest {
  personImage: File;
  garmentImage: File;
  options?: {
    [key: string]: any;
  };
}

export interface VTONResponse {
  success: boolean;
  jobId: string;
  message: string;
}

export interface VTONStatus {
  jobId: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  resultImage?: string;
  error?: VTONError;
}

export interface VTONError {
  code: string;
  message: string;
  details?: string;
} 