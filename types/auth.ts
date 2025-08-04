/**
 * Authentication related types
 */

export type UserRole = "admin" | "partner" | "user";

export interface User {
  id: number;
  clerkId: string;
  name?: string;
  email: string;
  imageUrl?: string;
  role: UserRole;
  createdAt: Date;
}

export interface AuthUser {
  id: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  username?: string;
  email: string;
  imageUrl?: string;
  role: UserRole;
}

export interface Session {
  user: AuthUser;
  isLoggedIn: boolean;
  isLoading: boolean;
}

export interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}
