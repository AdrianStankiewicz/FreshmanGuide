export interface Reply {
  nick: string;
  body: string;
  postId: number;
  createdAt: Date | string;
  verified: boolean;
}
