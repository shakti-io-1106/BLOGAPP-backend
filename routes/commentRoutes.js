const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createComment,
  getComments,
  deleteComment,
} = require("../controllers/commentController");

// Comments for a specific post
router.get("/:postId", getComments);

router.post("/:postId", protect, createComment);

router.delete("/delete/:commentId", protect, deleteComment);

module.exports = router;
