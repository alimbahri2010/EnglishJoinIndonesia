export type UserRole = 'admin' | 'student';

export interface UserSession {
  email: string;
  role: UserRole;
  name: string;
  avatar?: string;
  loginAt: string;
}
