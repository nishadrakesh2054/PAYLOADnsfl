export interface LiveVideo {
  id: string;
  videoUrl: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  match: string;
}

export interface LiveVideoResponse {
  docs: LiveVideo[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}
