const express = require("express");
const router = express.Router();
const { updatePassword } = require("../controllers/accountController");

router.put("/updatepassword/:id", updatePassword);

module.exports = router;
