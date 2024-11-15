import React, { useState, useRef, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { TbUpload } from 'react-icons/tb';
import { IoCloseSharp } from 'react-icons/io5';
import { Progress, Card, CardBody } from '@nextui-org/react';

interface FileUploaderProps {
  onFileUpload: (files: File[]) => Promise<void>;
  maxFiles?: number;
  acceptedFileTypes?: string[];
  maxSize?: number;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  onFileUpload,
  maxFiles = 5,
  acceptedFileTypes = ['image/*', 'application/pdf'],
  maxSize = 5242880 // 5MB
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    try {
      setError(null);
      
      // Generate previews for images
      const newPreviews = await Promise.all(
        acceptedFiles.map(file => {
          return new Promise<string>((resolve) => {
            if (file.type.startsWith('image/')) {
              const reader = new FileReader();
              reader.onloadend = () => {
                resolve(reader.result as string);
              };
              reader.readAsDataURL(file);
            } else {
              resolve('/file-icon.png'); // Default icon for non-image files
            }
          });
        })
      );

      setPreviews(prev => [...prev, ...newPreviews]);
      setFiles(prev => [...prev, ...acceptedFiles]);

      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          onFileUpload(acceptedFiles);
        }
      }, 200);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error uploading files');
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles,
    accept: acceptedFileTypes.reduce((acc, curr) => ({ ...acc, [curr]: [] }), {}),
    maxSize,
    multiple: true
  });

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <Card>
      <CardBody>
        <div
          {...getRootProps()}
          className={`relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
            ${isDragActive ? 'border-primary bg-primary/10' : 'border-gray-300'}`}
        >
          <input {...getInputProps()} />
          <TbUpload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">
            {isDragActive ? (
              'Drop the files here...'
            ) : (
              <>
                Drag & drop files here, or click to select files
                <br />
                <span className="text-xs text-gray-500">
                  (Max {maxFiles} files, up to {maxSize / 1024 / 1024}MB each)
                </span>
              </>
            )}
          </p>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-50 text-red-500 rounded-lg">
            {error}
          </div>
        )}

        {uploadProgress > 0 && uploadProgress < 100 && (
          <Progress
            value={uploadProgress}
            className="mt-4"
            color="primary"
            size="sm"
          />
        )}

        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {files.map((file, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                {file.type.startsWith('image/') ? (
                  <img
                    src={previews[index]}
                    alt={file.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <img
                      src="/file-icon.png"
                      alt="File"
                      className="w-12 h-12 opacity-50"
                    />
                  </div>
                )}
              </div>
              <button
                onClick={() => removeFile(index)}
                className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full 
                  opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <IoCloseSharp className="w-4 h-4" />
              </button>
              <p className="mt-1 text-xs text-gray-500 truncate">
                {file.name}
              </p>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};

export default FileUploader; 