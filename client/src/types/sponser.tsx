export interface SponserImage {
    url: string;
    thumbnailURL: string | null;
    alt: string;
    filename: string;
  }
  
  export interface Sponsor {
    id: string;
    website: string;
    name: string;
    logo: SponserImage;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface SponsorResponse {
    docs: Sponsor[];
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
  