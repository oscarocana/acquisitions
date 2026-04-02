import { z } from 'zod';

export const signUpSchema = z.object({
  name: z.string().min(1, 'Name is required').max(255, 'Name must be at most 255 characters').trim(),
  email: z.email('Invalid email format').min(1, 'Email is required').max(255, 'Email must be at most 255 characters').trim(), 
  password: z.string().min(6, 'Password must be at least 6 characters').max(128, 'Password must be at most 128 characters'),
  role: z.enum(['user', 'admin']).default('user')
});

export const signInSchema = z.object({
  email: z.email().min(2,'Please enter your Password').toLowerCase().trim(),
  password: z.string().min(1, 'Please enter your Password')
});
