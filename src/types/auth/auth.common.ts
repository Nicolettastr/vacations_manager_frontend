export interface Login {
  message: string;
  token: string;
  user: User;
}

export interface User {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
  name: string | null;
  lastname: string | null;
  avatar: string;
  theme: string;
  extra: Record<string, any>;
}

export interface userParams {
  email: string;
  password: string;
}

export interface SupabaseUserMetadata {
  email: string;
  email_verified: boolean;
  phone_verified: boolean;
  sub: string;
}

export interface SupabaseAppMetadata {
  provider: string;
  providers: string[];
}

export interface SupabaseIdentityData {
  email: string;
  email_verified: boolean;
  phone_verified: boolean;
  sub: string;
}

export interface SupabaseIdentity {
  identity_id: string;
  id: string;
  user_id: string;
  identity_data: SupabaseIdentityData;
  provider: string;
  last_sign_in_at: string;
  created_at: string;
  updated_at: string;
  email: string;
}

export interface SupabaseUser {
  id: string;
  aud: string;
  role: string;
  email: string;
  phone: string;
  confirmation_sent_at: string;
  app_metadata: SupabaseAppMetadata;
  user_metadata: SupabaseUserMetadata;
  identities: SupabaseIdentity[];
  created_at: string;
  updated_at: string;
  is_anonymous: boolean;
}

export interface RegisterResponse {
  message: string;
  user: SupabaseUser;
}
