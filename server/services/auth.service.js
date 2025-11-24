const prisma = require('../config/prisma');

class AuthService {
  /**
   * Find user by email
   */
  async findUserByEmail(email) {
    return await prisma.userDetails.findUnique({
      where: { email }
    });
  }

  /**
   * Create a new user
   */
  async createUser(userData) {
    return await prisma.userDetails.create({
      data: userData
    });
  }

  /**
   * Get user by ID
   */
  async getUserById(userId) {
    return await prisma.userDetails.findUnique({
      where: { userid: userId }
    });
  }

  /**
   * Update user password
   */
  async updatePassword(email, newPassword) {
    return await prisma.userDetails.update({
      where: { email },
      data: { password: newPassword }
    });
  }
}

module.exports = new AuthService();
