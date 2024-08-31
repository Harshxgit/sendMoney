const express = require('express');
const userRouter = require("./user");
const accountRouter = require("./account")
const router = express.Router()

//go inn user router
router.use("/user",userRouter);
//here go in account router
router.use("/account",accountRouter);


module.exports = router;