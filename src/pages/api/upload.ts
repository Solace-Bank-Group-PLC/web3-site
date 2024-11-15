import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadDir = path.join(process.cwd(), 'public', 'uploads');

// Ensure upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const form = formidable({
      uploadDir,
      keepExtensions: true,
      maxFiles: 5,
      maxFileSize: 5 * 1024 * 1024, // 5MB
      filter: ({ mimetype }) => {
        // Accept images and PDFs
        return mimetype?.includes('image/') || mimetype === 'application/pdf';
      },
    });

    const [fields, files] = await form.parse(req);

    const uploadedFiles = Array.isArray(files.file) 
      ? files.file 
      : [files.file];

    const fileData = uploadedFiles.map(file => ({
      name: file.originalFilename,
      size: file.size,
      type: file.mimetype,
      path: `/uploads/${path.basename(file.filepath)}`,
    }));

    res.status(200).json({ files: fileData });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Error uploading files' });
  }
} 