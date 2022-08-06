
/**
 *bulkInsertBlog.js
 */

const  BlogEntity = require('../../entities/Blog');
const response = require('../../utils/response');

/**
 * @description : create multiple records  in database.
 * @param {Object} dataToCreate : data for creating documents.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : created Blogs. {status, message, data}
 */

const bulkInsertBlog = ({ BlogDb }) => async (dataToCreate,req,res) => {
  let blogEntities = dataToCreate.map(item => BlogEntity(item));
  let createdBlog = await BlogDb.create(blogEntities);
  return response.success({ data:{ count:createdBlog.length || 0 } });
};
module.exports = bulkInsertBlog;