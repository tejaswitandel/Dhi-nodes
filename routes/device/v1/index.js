const express =  require('express');
const router =  express.Router();
router.use('/device/auth',require('./auth'));
router.use(require('./BlogRoutes'));

module.exports = router;
