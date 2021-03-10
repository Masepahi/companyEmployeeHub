const express = require("express");
const router = express.Router();
const employeesRouter = require('./employees');
const companyRouter = require('./company');


router.use('/employee', employeesRouter);
router.use('/company', companyRouter)



module.exports = router;