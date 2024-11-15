interface ApiResponse<T = unknown> {
  data: T;
  error: string | null;
  status: number;
}

interface PaginatedResponse<T> extends ApiResponse<T> {
  meta: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

interface ErrorResponse {
  error: string;
  status: number;
  details?: unknown;
}

type ApiHandler<T = unknown> = (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<T> | ErrorResponse>
) => Promise<void> | void; 