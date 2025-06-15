import { User as SupabaseUser } from "@supabase/supabase-js";
import { Profile } from "@/lib/supabase";

export type UserRole = "patient" | "practitioner";

export interface PatientProfile {
  id: string;
  userId: string;
  name: string;
  pregnancyWeek?: number;
  dueDate?: string;
  status: "pregnant" | "postpartum";
  location?: string;
  avatar?: string;
}

export interface PractitionerProfile {
  id: string;
  userId: string;
  name: string;
  title: string;
  specialization?: string;
  licenseNumber?: string;
  avatar?: string;
}

export interface AuthState {
  user: SupabaseUser | null;
  profile: Profile | null;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData extends LoginCredentials {
  name: string;
  role: UserRole;
}
