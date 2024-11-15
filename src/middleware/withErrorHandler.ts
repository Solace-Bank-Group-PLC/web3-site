import { NextApiRequest, NextApiResponse } from 'next';
import { AppError } from '@/types/errors';
import { ERROR_CODES } from '@/constants';

export function withErrorHandler(
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>
) {
  return async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    try {
      await handler(req, res);
    } catch (error) {
      console.error('API Error:', error);

      if (error instanceof AppError) {
        return res.status(error.metadata.statusCode).json({
          error: error.toJSON()
        });
      }

      const appError = new AppError(
        'An unexpected error occurred',
        ERROR_CODES.INTERNAL_ERROR,
        500,
        { originalError: error }
      );

      res.status(500).json({
        error: appError.toJSON()
      });
    }
  };
} 