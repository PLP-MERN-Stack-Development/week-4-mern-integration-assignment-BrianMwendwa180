const express = require('express');
const { createPost, getMyPosts, getAllPosts, updatePost, deletePost } = require('../controllers/postControllers');
const { protect, authorize } = require('../middleware/auth');
const router = express.Router();

router.post('/', protect, authorize(['user', 'admin']), createPost);
router.get('/me', protect, authorize(['user', 'admin']), getMyPosts);
router.get('/all', protect, authorize(['admin']), getAllPosts);
router.put("/:id", protect, updatePost );
router.delete("/:id", protect, deletePost);



module.exports = router;