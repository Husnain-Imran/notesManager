const express = require("express");
const { getUserController } = require("../controller/userController")
;
const getUser = require("../controller/userController");
const userAuth  = require("../Middlewares/authMiddleware");

const router = express.Router();    

router.post("/getUser", userAuth , getUser);

module.exports = router;