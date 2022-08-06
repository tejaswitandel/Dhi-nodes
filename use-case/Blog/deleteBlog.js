
/**
 *deleteBlog.js
 */
 
const response = require('../../utils/response');
/**
 * @description : delete record from database.
 * @param {Object} query : query.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : deleted Blog. {status, message, data}
 */
const deleteBlog = ({ BlogDb }) => async (query,req,res) => {
  let deletedBlog = await BlogDb.deleteOne(query);
  if (!deletedBlog){
    return response.recordNotFound({});
  }
  return response.success({ data: deletedBlog });
};

module.exports = deleteBlog;