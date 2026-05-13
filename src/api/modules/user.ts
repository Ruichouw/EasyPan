export interface UserProfile {
  id: string;
  name: string;
  email: string;
}

export async function getCurrentUserProfile(): Promise<UserProfile | null> {
  return null;
}