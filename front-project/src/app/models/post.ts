import { Category } from './category';
import { Reply } from './reply';

export interface Post {
  id: number;
  nick: string;
  categoryID: Category;
  body: string;
  createdAt: Date;
  verified: boolean;
  replies: Reply[];
}
