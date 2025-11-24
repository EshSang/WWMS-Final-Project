const prisma = require('../config/prisma');

class CategoryService {
  /**
   * Get all job categories
   */
  async getAllCategories() {
    return await prisma.jobCategory.findMany({
      orderBy: {
        category: 'asc'
      }
    });
  }

  /**
   * Get category by ID
   */
  async getCategoryById(categoryId) {
    return await prisma.jobCategory.findUnique({
      where: { category_id: categoryId }
    });
  }

  /**
   * Create a new category
   */
  async createCategory(categoryData) {
    return await prisma.jobCategory.create({
      data: categoryData
    });
  }

  /**
   * Update category
   */
  async updateCategory(categoryId, categoryData) {
    return await prisma.jobCategory.update({
      where: { category_id: categoryId },
      data: categoryData
    });
  }

  /**
   * Delete category
   */
  async deleteCategory(categoryId) {
    return await prisma.jobCategory.delete({
      where: { category_id: categoryId }
    });
  }
}

module.exports = new CategoryService();
