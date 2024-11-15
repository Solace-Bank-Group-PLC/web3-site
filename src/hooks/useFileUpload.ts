import { useState } from 'react';
import axios from 'axios';

interface UploadedFile {
  name: string;
  size: number;
  type: string;
  path: string;
}

interface UseFileUploadReturn {
  uploadFiles: (files: File[]) => Promise<UploadedFile[]>;
  uploading: boolean;
  error: string | null;
}

export const useFileUpload = (): UseFileUploadReturn => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadFiles = async (files: File[]): Promise<UploadedFile[]> => {
    try {
      setUploading(true);
      setError(null);

      const formData = new FormData();
      files.forEach(file => {
        formData.append('file', file);
      });

      const { data } = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return data.files;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error uploading files';
      setError(message);
      throw new Error(message);
    } finally {
      setUploading(false);
    }
  };

  return { uploadFiles, uploading, error };
}; 