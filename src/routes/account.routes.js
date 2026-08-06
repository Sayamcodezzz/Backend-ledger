const express = require("express");

const router = express.Router();
const authMiddleware= require("../middleware/auth.middleware")
const accountController= require("../controller/account.controller")

// const app=express();



/**
 *  -POST  /api/accounts/
 * - description : Create a new account
 * - Protected route
 * 
 */

router.post("/",authMiddleware.authMiddleware,accountController.createAccountController)

module.exports=router