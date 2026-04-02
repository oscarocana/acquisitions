import bcrypt from 'bcrypt';
import logger from '../config/logger.js';

export const hashPassword = async (password) => {
  try {
    return await bcrypt.hash(password, 10);
  } catch (error) {
    logger.error('Error hashing password', error);
    throw new Error('Error hashing password');
  }
};