export type UserRole = "patient" | "practitioner";

export interface User {
  id: string;
  email: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

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
  user: User | null;
  profile: PatientProfile | PractitionerProfile | null;
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
