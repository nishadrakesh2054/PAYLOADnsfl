

export interface HighlightImage {
  url: string;
  thumbnailURL: string | null;
  alt: string;
  filename: string;
}

export interface Highlight {
  id: string;
  title: string;
//   description: string;
  image: HighlightImage;
  publishedDate: string;
  views: number;
  duration: string;
  videoUrl: string;
  videoId: string;
  lastUpdated?: string;
  createdAt: string;
  updatedAt: string;
}

export interface HighlightResponse {
  docs: Highlight[];
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

export interface HighlightByIdResponse {
  data: Highlight;
}
export interface HighlightModalProps {
    highlight: Highlight | null;
    onClose: () => void;
  }