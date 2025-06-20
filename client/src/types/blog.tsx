export interface BlogImage {
  url: string;
  thumbnailURL: string | null;
  alt: string;
  filename: string;
}

export interface Blog {
  id: string;
  title: string;
  preview: string;
  content: any; // rich text (since it's a nested structure)
  readTime: string;
  category: string;
  date: string;
  image: BlogImage;
  createdAt: string;
  updatedAt: string;
}

export interface BlogResponse {
  docs: Blog[];
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

export interface BlogByIdResponse {
  data: Blog;
}
