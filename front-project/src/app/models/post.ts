import { Reply } from './reply';

export interface Post {
  id: number;
  nick: string;
  categoryId: number;
  body: string;
  createdAt: Date | string;
  verified: boolean;
  reply: Reply[];
}

export interface PostPost {
  nick: string;
  categoryId: number;
  body: string;
  createdAt: Date | string;
  verified: boolean;
  reply: Reply[] | null;
}

export interface UpdatePost {
  nick: string;
  categoryId: number;
  body: string;
  verified: boolean;
}
