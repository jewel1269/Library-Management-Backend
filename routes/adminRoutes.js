const express = require("express");
const { registerAdmin, loginAdmin, findAdmin } = require("../controllers/adminController");
const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get('/', findAdmin)
// router.get("/", getUser)

module.exports = router;
