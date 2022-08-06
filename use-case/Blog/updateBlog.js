/**
 *updateBlog.js
 */

const  BlogEntity = require('../../entities/Blog');
const response = require('../../utils/response');

/**
 * @description : update record with data by id.
 * @param {Object} params : request body including query and data.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : updated Blog. {status, message, data}
 */
const updateBlog = ({
  BlogDb, updateValidation
}) => async (params,req,res) => {
  let {
    dataToUpdate, query 
  } = params;
  const validateRequest = await updateValidation(dataToUpdate);
  if (!validateRequest.isValid) {
    return response.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
  }
  let blog = BlogEntity(dataToUpdate);
  blog = await BlogDb.updateOne(query,blog);
  if (!blog){
    return response.recordNotFound();
  }
  return response.success({ data:blog });
};
module.exports = updateBlog;