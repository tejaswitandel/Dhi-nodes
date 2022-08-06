const BlogDb = require('../../../../data-access/BlogDb');

const BlogSchema = require('../../../../validation/schema/Blog');

const createValidation = require('../../../../validation')(BlogSchema.createSchema);
const updateValidation = require('../../../../validation')(BlogSchema.updateSchema);
const filterValidation = require('../../../../validation')(BlogSchema.filterValidationSchema);
const addBlogUsecase = require('../../../../use-case/Blog/addBlog')({
  BlogDb,
  createValidation 
});
const findAllBlogUsecase = require('../../../../use-case/Blog/findAllBlog')({
  BlogDb,
  filterValidation
});
const getBlogCountUsecase = require('../../../../use-case/Blog/getBlogCount')({
  BlogDb,
  filterValidation
});
const softDeleteManyBlogUsecase = require('../../../../use-case/Blog/softDeleteManyBlog')({ BlogDb });
const bulkInsertBlogUsecase = require('../../../../use-case/Blog/bulkInsertBlog')({ BlogDb });
const bulkUpdateBlogUsecase = require('../../../../use-case/Blog/bulkUpdateBlog')({ BlogDb });
const deleteManyBlogUsecase = require('../../../../use-case/Blog/deleteManyBlog')({ BlogDb });
const softDeleteBlogUsecase = require('../../../../use-case/Blog/softDeleteBlog')({ BlogDb });
const partialUpdateBlogUsecase = require('../../../../use-case/Blog/partialUpdateBlog')({ BlogDb });
const updateBlogUsecase = require('../../../../use-case/Blog/updateBlog')({
  BlogDb,
  updateValidation 
});
const getBlogUsecase = require('../../../../use-case/Blog/getBlog')({
  BlogDb,
  filterValidation
});
const deleteBlogUsecase = require('../../../../use-case/Blog/deleteBlog')({ BlogDb });

const BlogController = require('./Blog');

const addBlog = BlogController.addBlog(addBlogUsecase);
const findAllBlog = BlogController.findAllBlog(findAllBlogUsecase);
const getBlogCount = BlogController.getBlogCount(getBlogCountUsecase);
const softDeleteManyBlog = BlogController.softDeleteManyBlog(softDeleteManyBlogUsecase);
const bulkInsertBlog = BlogController.bulkInsertBlog(bulkInsertBlogUsecase);
const bulkUpdateBlog = BlogController.bulkUpdateBlog(bulkUpdateBlogUsecase);
const deleteManyBlog = BlogController.deleteManyBlog(deleteManyBlogUsecase);
const softDeleteBlog = BlogController.softDeleteBlog(softDeleteBlogUsecase);
const partialUpdateBlog = BlogController.partialUpdateBlog(partialUpdateBlogUsecase);
const updateBlog = BlogController.updateBlog(updateBlogUsecase);
const getBlogById = BlogController.getBlog(getBlogUsecase);
const deleteBlog = BlogController.deleteBlog(deleteBlogUsecase);

module.exports = {
  addBlog,
  findAllBlog,
  getBlogCount,
  softDeleteManyBlog,
  bulkInsertBlog,
  bulkUpdateBlog,
  deleteManyBlog,
  softDeleteBlog,
  partialUpdateBlog,
  updateBlog,
  getBlogById,
  deleteBlog,
};