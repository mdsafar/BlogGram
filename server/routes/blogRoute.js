import express from 'express'
import { addSubComment, allComments, commentBlog, createBlog, deleteBlog, deleteComment, deleteSubComment, getAllBlogs, getBlogDetails, getCommentLikeStatus, getFollowingUserBlogs, getLikeStatus, getSubCommentLikeStatus, likeBlog, likeComment, likeSubComment, unlikeBlog, unlikeComment, unlikeSubComment, updateBlog } from '../Controllers/blogController.js'
import { verifyUser } from '../Middlewares/authMiddleware.js'

const router = express.Router()

router.route('/create').post(verifyUser,createBlog)

router.route('/b/:slug').get(verifyUser,getBlogDetails)
router.route('/all/blogs').get(verifyUser,getAllBlogs)
router.route('/b/following/users').get(verifyUser,getFollowingUserBlogs)

router.route('/b/:id')
.put(verifyUser,updateBlog)
.delete(verifyUser,deleteBlog)

router.route('/b/:slug/like').put(verifyUser,likeBlog)
router.route('/b/:slug/unlike').put(verifyUser,unlikeBlog)
router.route('/b/:slug/likeStatus').get(verifyUser,getLikeStatus)

router.route('/b/:slug/comment')
.post(verifyUser,commentBlog)
.get(verifyUser,allComments)

router.route('/b/:slug/comments/:commentId')
.delete(verifyUser,deleteComment)
.get(verifyUser,getCommentLikeStatus)

router.route('/b/:slug/comments/:commentId/like')
.put(verifyUser, likeComment);
router.route('/b/:slug/comments/:commentId/unlike')
.put(verifyUser, unlikeComment);


router.route('/b/:slug/comments/:commentId/subcomment')
.post(verifyUser,addSubComment)

router.route('/b/:slug/comments/:commentId/subcomments/:subCommentId')
.delete(verifyUser,deleteSubComment)
.get(verifyUser,getSubCommentLikeStatus)

router.route('/b/:slug/comments/:commentId/subcomments/:subCommentId/like')
.put(verifyUser,likeSubComment)
router.route('/b/:slug/comments/:commentId/subcomments/:subCommentId/unlike')
.put(verifyUser,unlikeSubComment)


export default router