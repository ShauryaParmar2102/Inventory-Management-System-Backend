// Import the allowed user role and status types
import type { TUserRole, TUserStatus } from '../../constant/userRole.js';

// Defines the structure of a user object
export interface IUser{
  name: string;  // User's full name
  email: string; // User's email address
  title?: string; // Optional job or profile title
  description?: string; // Optional description or bio about the user
  role: TUserRole; // User's role, such as ADMIN or USER
  avatar?: string;  // Optional profile picture/avatar
  password: string; // User's password
  status: TUserStatus; // Current status of the user, such as PENDING, ACTIVE or BLOCK
  address?: string; // Optional street/home address
  phone?: string; // Optional phone number
  city?: string; // Optional city
  country?: string; // Optional country
  facebook?: string; // Optional Facebook profile
  twitter?: string;  // Optional Twitter profile
  linkedin?: string; // Optional LinkedIn profile
  instagram?: string; // Optional Instagram profile
} 
