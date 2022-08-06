/**
 *addBlog.js
 */

const  BlogEntity = require('../../entities/Blog');
const response = require('../../utils/response');
/**
 * @description : create new record of Blog in database.
 * @param {Object} dataToCreate : data for create new document.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : response of create. {status, message, data}
 */
const addBlog = ({
  BlogDb,createValidation 
}) => async (dataToCreate,req,res) => {
  const validateRequest = await createValidation(dataToCreate);
  if (!validateRequest.isValid) {
    return response.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
  }
  let Blog = BlogEntity(dataToCreate);
  Blog = await BlogDb.create(Blog);
  return response.success({ data:Blog });
};
module.exports = addBlog;