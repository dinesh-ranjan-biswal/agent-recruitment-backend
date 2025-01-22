import bcrypt from 'bcryptjs';
import logger from './logger.utils.js';

const SALT_ROUNDS = 12; 

class PasswordHasher {
  /**
   * Hash a password using bcrypt
   * @param {string} password - The plain text password to hash
   * @returns {Promise<string>} The hashed password
   * @throws {Error} If password is invalid or hashing fails
   */
  static async hashPassword(password) {
    if (!password || typeof password !== 'string') {
      throw new Error('Invalid password provided');
    }

    try {
      // Generate a salt and hash the password
      const salt = await bcrypt.genSalt(SALT_ROUNDS);
      const hashedPassword = await bcrypt.hash(password, salt);
      return hashedPassword;
    } catch (error) {
      logger.error(`error ${error.message}`);
      throw new Error(`Password hashing failed: ${error.message}`);
    }
  }

  /**
   * Compare a plain text password with a hashed password
   * @param {string} password - The plain text password to check
   * @param {string} hashedPassword - The hashed password to compare against
   * @returns {Promise<boolean>} True if passwords match, false otherwise
   * @throws {Error} If invalid inputs are provided or comparison fails
   */
  static async verifyPassword(password, hashedPassword) {
    if (!password || !hashedPassword || 
        typeof password !== 'string' || 
        typeof hashedPassword !== 'string') {
      throw new Error('Invalid password or hash provided');
    }

    try {
      const isMatch = await bcrypt.compare(password, hashedPassword);
      return isMatch;
    } catch (error) {
      logger.error(`error ${error.message}`);
      throw new Error(`Password verification failed: ${error.message}`);
    }
  }
}

export default PasswordHasher;