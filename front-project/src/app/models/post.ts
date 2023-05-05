import { Reply } from './reply';

export interface Post {
  id: number;
  nick: string;
  categoryId: number;
  body: string;
  createdAt: Date;
  verified: boolean;
  replies: Reply[];
}
