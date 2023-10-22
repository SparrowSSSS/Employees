const express = require("express");

const router = express.Router();

const routerFunctions = require("../controllers/routerEmployees");

const {auth} = require("../middleware/auth");

// /api/employees/
router.get("/", auth, routerFunctions.all);

// /api/employees/:id
router.get("/:id", auth, routerFunctions.employee);

// /api/employees/add
router.post("/add", auth, routerFunctions.add);

// /api/employees/remove/:id
router.post("/remove/:id", auth, routerFunctions.remove);

// /api/employees/edit/:id
router.put("/edit/:id", auth, routerFunctions.edit);

module.exports = router;