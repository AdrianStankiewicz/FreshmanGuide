export interface Reply {
  id?: number;
  nick: string;
  body: string;
  postId: number;
  createdAt: Date | string;
  verified: boolean;
}
