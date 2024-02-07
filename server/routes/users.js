const express = require("express")
const { createUser, createLogin } = require("../controllers/users");
const router = express.Router()

router.post('/register', createUser);
router.post('/login', createLogin);

module.exports = router;