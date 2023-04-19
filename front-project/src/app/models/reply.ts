import { Post } from './post';

export interface Reply {
  id: number;
  nick: string;
  postID: Post;
  body: string;
  createdAt: Date;
  verified: boolean;
}
