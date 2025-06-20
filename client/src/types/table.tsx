// src/types/table.ts

export interface TeamImage {
  url: string;
  thumbnailURL: string | null;
  alt: string;
  filename: string;
}

export interface Team {
  id: string;
  team_name: string;
  team_logo: TeamImage;
  team_details: string;
  team_manager: string;
  foundedYear: string;
  stadium: string;
  createdAt: string;
  updatedAt: string;
}

export interface TableData {
  id: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  form: string | null;
  team: Team;
  createdAt: string;
  updatedAt: string;
}
export interface TableResponse {
  docs: TableData[];
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
