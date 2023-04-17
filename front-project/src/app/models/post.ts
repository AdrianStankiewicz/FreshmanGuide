import { Category } from './category';

export interface Post {
  id: number;
  nick: string;
  categoryID: Category;
  body: string;
  createdAt: Date;
  verified: boolean;
  replies: any[];
}
