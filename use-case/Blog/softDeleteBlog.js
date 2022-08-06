/**
 *softDeleteBlog.js
 */

const response = require('../../utils/response');

/**
 * @description : soft delete record from database by id;
 * @param {Object} params : request body.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response..
 * @return {Object} : deactivated Blog. {status, message, data}
 */
const softDeleteBlog = ({ BlogDb }) => async (params,req,res) => {
  let updatedBlog = await BlogDb.updateOne(params.query, params.dataToUpdate);
  if (!updatedBlog){
    return response.recordNotFound();   
  }
  return response.success({ data:updatedBlog });
};
module.exports = softDeleteBlog;