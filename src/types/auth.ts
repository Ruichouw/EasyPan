export interface SessionUser {
  id: string;
  name: string;
  email: string;
  permissions?: string[];
  roles?: string[];
}

export interface SessionData {
  session: {
    id: string;
    expiresAt: string;
  };
  user: SessionUser;
  permissions?: string[];
}
