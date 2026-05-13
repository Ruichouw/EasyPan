export interface SessionUser {
  id: string;
  name: string;
  email: string;
}

export interface SessionData {
  session: {
    id: string;
    expiresAt: string;
  };
  user: SessionUser;
}