const response = require('../../../../utils/response'); 
const responseHandler = require('../../../../utils/response/responseHandler'); 
const getSelectObject = require('../../../../utils/getSelectObject'); 

const addBlog = (addBlogUsecase) => async (req,res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    dataToCreate.addedBy = req.user.id;
    let result = await addBlogUsecase(dataToCreate,req,res);
    return responseHandler(res,result);
  } catch (error){
    return responseHandler(res,response.internalServerError({ message:error.message }));
  }
};

const bulkInsertBlog = (bulkInsertBlogUsecase)=> async (req,res) => {
  try {
    let dataToCreate = [...req.body.data];
    for (let i = 0;i < dataToCreate.length;i++){
      dataToCreate[i] = {
        ...dataToCreate[i],
        addedBy:req.user.id,
      };
    }
    let result = await bulkInsertBlogUsecase(dataToCreate,req,res);
    return responseHandler(res,result);
  } catch (error){
    return responseHandler(res,response.internalServerError({ message:error.message }));
  }
};

const findAllBlog = (findAllBlogUsecase) => async (req,res) => {
  try {
    let query = { ...req.body.query || {} };
    let options = { ...req.body.options || {} };
    let result = await findAllBlogUsecase({
      query,
      options,
      isCountOnly:req.body.isCountOnly || false
    },req,res);
    return responseHandler(res,result);
  } catch (error){
    return responseHandler(res,response.internalServerError({ message:error.message }));
  }
};

const getBlog = (getBlogUsecase) => async (req,res) =>{
  try {
    if (!req.params.id){
      return responseHandler(res,response.badRequest());
    }
    let query = { _id: req.params.id };
    let options = {};
    let result = await getBlogUsecase({
      query,
      options
    },req,res);
    return responseHandler(res,result);
  } catch (error) {
    return responseHandler(res,response.internalServerError({ message:error.message }));
  }
};

const getBlogCount = (getBlogCountUsecase) => async (req,res) => {
  try {
    let where = { ...req.body.where || {} };
    let result = await getBlogCountUsecase({ where },req,res);  
    return responseHandler(res,result);
  } catch (error){
    return responseHandler(res,response.internalServerError({ message:error.message }));
  }
};

const updateBlog = (updateBlogUsecase) => async (req,res) =>{
  try {
    if (!req.params.id){
      return responseHandler(res,response.badRequest({ message : 'Insufficient request parameters! id is required.' }));
    }
    let dataToUpdate = { ...req.body || {} };
    let query = { _id: req.params.id };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let result = await updateBlogUsecase({
      dataToUpdate,
      query
    },req,res);
    return responseHandler(res,result);
  } catch (error){
    return responseHandler(res,response.internalServerError({ message:error.message }));
  }
};

const bulkUpdateBlog = (bulkUpdateBlogUsecase) => async (req,res) => {
  try {
    let dataToUpdate = { ...req.body.data || {} };
    let query = { ...req.body.filter || {} };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let result = await bulkUpdateBlogUsecase({
      dataToUpdate,
      query
    },req,res);
    return responseHandler(res,result);
  } catch (error){
    return responseHandler(res,response.internalServerError({ message:error.message }));
  }
};

const partialUpdateBlog = (partialUpdateBlogUsecase) => async (req,res) => {
  try {
    if (!req.params.id){
      return responseHandler(res,response.badRequest({ message : 'Insufficient request parameters! id is required.' }));
    }
    let query = { _id: req.params.id };
    let dataToUpdate = { ...req.body || {} };
    dataToUpdate.updatedBy = req.user.id;
    let result = await partialUpdateBlogUsecase({
      dataToUpdate,
      query
    },req,res);
    return responseHandler(res,result);
  } catch (error){
    return responseHandler(res,response.internalServerError({ message:error.message }));
  }
};

const softDeleteBlog = (softDeleteBlogUsecase) => async (req,res)=>{
  try {
    if (!req.params.id){
      return responseHandler(res,response.badRequest({ message : 'Insufficient request parameters! id is required.' }));
    }
    let query = { _id: req.params.id };
    const dataToUpdate = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let result = await softDeleteBlogUsecase({
      query,
      dataToUpdate
    },req,res);
    return responseHandler(res,result);
  } catch (error){
    return responseHandler(res,response.internalServerError({ message:error.message }));
  }
};

const deleteBlog = (deleteBlogUsecase) => async (req,res) => {
  try {
    if (!req.params.id){
      return responseHandler(res,response.badRequest({ message : 'Insufficient request parameters! id is required.' }));
    }
    let query = { _id: req.params.id };
    let result = await deleteBlogUsecase(query,req,res);
    return responseHandler(res,result);
  } catch (error){
    return responseHandler(res,response.internalServerError({ message:error.message }));
  }
};

const deleteManyBlog = (deleteManyBlogUsecase) => async (req,res) => {
  try {
    if (!req.body || !req.body.ids){
      return responseHandler(res,response.badRequest({ message : 'Insufficient request parameters! ids field is required.' }));
    }
    let ids = req.body.ids;
    let query = { _id : { $in:ids } };
    let result = await deleteManyBlogUsecase(query,req,res);
    return responseHandler(res,result);
  } catch (error){
    return responseHandler(res,response.internalServerError({ message:error.message }));
  }
};

const softDeleteManyBlog = (softDeleteManyBlogUsecase) => async (req,res) => {
  try {
    if (!req.body || !req.body.ids){
      return responseHandler(res,response.badRequest({ message : 'Insufficient request parameters! ids field is required.' }));
    }
    let ids = req.body.ids;
    let query = { _id : { $in:ids } };
    const dataToUpdate = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await softDeleteManyBlogUsecase({
      query,
      dataToUpdate
    },req,res);
    return responseHandler(res,result);
  } catch (error){
    return responseHandler(res,response.internalServerError({ message:error.message }));
  }
};

module.exports = {
  addBlog,
  bulkInsertBlog,
  findAllBlog,
  getBlog,
  getBlogCount,
  updateBlog,
  bulkUpdateBlog,
  partialUpdateBlog,
  softDeleteBlog,
  deleteBlog,
  deleteManyBlog,
  softDeleteManyBlog
};
