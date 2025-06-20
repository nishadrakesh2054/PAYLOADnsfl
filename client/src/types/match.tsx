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

}

export interface PlayerImage {
  url: string;
  thumbnailURL: string | null;
  alt: string;
  filename: string;
}

export interface Player {
  id: string;
  name: string;
  img: TeamImage;
//   appearance?: number;
//   cleansheet?: number;
//   goals?: number;
//   yellowcards?: number;
//   redcards?: number;
//   nationality: string;
//   dateofbirth: string;
//   height: {
//     feet: number;
//     inches: number;
//   };
//   weight: {
//     value: number;
//   };
//   team: Team;
  position: string;
//   createdAt: string;
//   updatedAt: string;
}

export interface Match {
  id: string;
  match_date: string;
  time: string;
  week: number;
  venue: string;
  status: string;
  scoreHome: number | null;
  scoreAway: number | null;
  referee: string;
  assistantReferee1: string;
  assistantReferee2: string;
  fourthOfficial: string;
  homeTeam: Team;
  awayTeam: Team;
  homePlayers: Player[];
  awayPlayers: Player[];
  createdAt: string;
  updatedAt: string;
  matchDate?: Date;
}

export interface MatchResponse {
  docs: Match[];
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

export interface MatchDetails extends Match {
  deletedAt: string | null;
}
export interface MatchByIdResponse {
  data: MatchDetails;
}
