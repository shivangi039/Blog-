const express = require("express")
const {getPosts, createPost, getPostById, deleteById, editById} = require("../controllers/blogs");
const router = express.Router()

router.get('/blogs', getPosts);
router.post('/create', createPost);
router.get("/blog/:id", getPostById);
router.get("/delete/:id", deleteById);
router.put('/edit/:id', editById)

module.exports = router;