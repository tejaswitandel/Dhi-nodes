/**
 *deleteManyBlog.js
 */

const response = require('../../utils/response');
/**
 * @description : delete records from database by using ids.
 * @param {Object} query : query.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyBlog = ({ BlogDb }) => async (query,req,res) => {
  let deletedBlog = await BlogDb.deleteMany(query);
  return response.success({ data: { count : deletedBlog } });
};
module.exports = deleteManyBlog;