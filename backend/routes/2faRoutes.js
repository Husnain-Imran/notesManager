const express = require("express")

const {register2fa ,verify} = require("../controller/2faController");
const userAuth = require("../Middlewares/authMiddleware");


const router = express.Router();

router.post("/register2fa", userAuth, register2fa);
router.post("/verify", userAuth, verify);

module.exports = router;