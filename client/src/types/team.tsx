export interface TeamImage {
  url: string;
  thumbnailURL?: string | null;
  alt: string;
  filename: string;
}
export interface PlayerImage {
  url: string;
  thumbnailURL: string | null;
  alt: string;
  filename: string;
}
export interface Height {
  feet: number;
  inches: number;
}

export interface Weight {
  value: number;
}
export interface Player {
  id: string;
  name: string;
  position: string;
  img: PlayerImage;
  appearance: number;
  cleansheet: number;
  goals: number;
  yellowcards: number;
  redcards: number;
  nationality: string;
  dateofbirth: string;
  height: Height;
  weight: Weight;
  team?: Team;
  createdAt: string;
  updatedAt: string;
}

export interface Team {
  id: string;
  team_name: string;
  team_logo: TeamImage;
  team_details?: string;
  team_manager?: string;
  foundedYear?: string;
  stadium?: string;
  createdAt: string;
  updatedAt: string;
  players?: Player[];
}

export interface TeamResponse {
  docs: Team[];
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

// export interface TeamByIdResponse {
//   data: Team;
// }
