export interface ApiError {
  title: string;
  message: string;
  status?: number;
}

export interface ApiResponse<T> {
  data: T | null;
  error: ApiError | null;
  status: number;
}
