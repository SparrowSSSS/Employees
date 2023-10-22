const express = require('express');

const routerFunctions = require("../controllers/routerUsers")

const router = express.Router();

const {auth} = require("../middleware/auth");

// /api/user/login 
router.post('/login', routerFunctions.login);

// /api/user/register
router.post('/register', routerFunctions.register);

// /api/user/current
router.get('/current', auth, routerFunctions.current);

module.exports = router;
