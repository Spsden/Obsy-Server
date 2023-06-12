const express = require("express");
const router = express.Router();

const { login, register } = require("../controllers/auth");
const { StatusCodes } = require("http-status-codes");

const hey = async(req,res) => {
    res.status(StatusCodes.BAD_GATEWAY).json({
        "obsy":"change route"
    })
}
router.get("/hi",hey)

router.post("/register", register);
router.post("/login", login);



module.exports = router;
