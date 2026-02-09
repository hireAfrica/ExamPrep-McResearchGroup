import type { SubscriptionType } from ".";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  subscription: SubscriptionType;
  createdAt: Date;
}

export interface AuthFormData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  confirmPassword?: string;
  acceptTerms?: boolean;
  rememberMe?: boolean;
}