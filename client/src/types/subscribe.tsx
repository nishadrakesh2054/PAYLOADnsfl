

export interface Subscribe {
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface SubscribeResponse {
  doc: Subscribe;
  message: string;
}

export interface CreateSubscribeInput {
  email: string;
}
