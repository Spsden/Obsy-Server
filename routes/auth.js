const express = require("express");
const router = express.router();

const { login, register } = require("../controllers/auth");

router.post('/register',register)
router.post('/login',login)

module.exports= {
    router
}
