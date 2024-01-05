import AsyncHandler from 'express-async-handler'
import Blog from "../Models/blogModel.js"
import User from '../Models/userModel.js'
import shortid from 'shortid'



export const createBlog = AsyncHandler(async (req, res, next) => {
    try {
        const userId = req.user._id
        const { title, content } = req.body

        const slug = shortid.generate()

        const blog = new Blog({
            userId: userId,
            title,
            content,
            slug: slug,
            likes: [],
            comments: []
        })

        await blog.save()

        res.json({
            success: true,
            blog
        })

    } catch (err) {
        next(err)
    }
})

export const getFollowingUserBlogs = AsyncHandler(async (req, res, next) => {
    try {

        const userId = req.user._id;


        const followingUsers = await User.find({ followers: userId });


        const followingUserIds = followingUsers.map(user => user._id);

        followingUserIds.push(userId)

        const blogs = await Blog.find({ userId: { $in: followingUserIds } }).populate('userId')

        res.json(blogs);

    } catch (err) {
        next(err);
    }
});


export const getAllBlogs = AsyncHandler(async (req, res, next) => {
    try {
        const userId = req.user._id
        const blogs = await Blog.find({userId: { $ne: userId } }).populate('userId')

        res.json(blogs)

    } catch (err) {
        next(err)
    }
})

export const getBlogDetails = AsyncHandler(async (req, res, next) => {
    try {
        const slug = req.params.slug

        const blog = await Blog.findOne({ slug: slug })
            .populate({
                path: 'comments',
                populate: {
                    path: 'userId'
                }
            })
            .populate({
                path: 'comments',
                populate: {
                    path: 'subComments',
                    populate: {
                        path: 'userId'
                    }
                }
            })
            .populate('userId');

        if (!blog) {
            res.status(404)
            throw new Error("Blog Not Found")
        }

        res.json(blog)

    } catch (err) {
        next(err)
    }
})


export const updateBlog = AsyncHandler(async (req, res, next) => {
    try {
        const id = req.params.id

        let blog = await Blog.findById(id)

        if (!blog) {
            res.status(404).json({ success: false })
            return
        }

        if (blog.userId.toString() !== req.user._id.toString()) {
            res.status(401).json({ success: false })
            return
        }


        blog = await Blog.findByIdAndUpdate(blog._id, req.body, { new: true })

        res.json({
            success: true,
            blog
        })

    } catch (err) {
        next(err)
    }
})

export const deleteBlog = AsyncHandler(async (req, res, next) => {
    try {
        const id = req.params.id

        const blog = await Blog.findById(id)
        if (!blog) {
            res.status(404).json({ success: false })
            return
        }

        if (blog.userId.toString() !== req.user._id.toString()) {
            res.status(401).json({ success: false })
            return
        }

        await blog.deleteOne()

        res.status(200).json({
            success: true,
            message: "Blog Deleted"
        })

    } catch (err) {
        next(err)
    }
})

export const getLikeStatus = AsyncHandler(async (req, res, next) => {
    try {
        const userId = req.user.id;
        const slug = req.params.slug;

        const blog = await Blog.findOne({ slug });

        if (blog.likes.includes(userId)) {
            res.status(200).json({ isLiked: true, slug: slug });
        } else {
            res.status(200).json({ isLiked: false, slug: slug })
        }

    } catch (err) {
        next(err)
    }
});


export const likeBlog = AsyncHandler(async (req, res, next) => {
    try {
        const slug = req.params.slug;
        const userId = req.user._id;

        const blog = await Blog.findOne({ slug });

        if (!blog) {
            res.status(404).json({ success: false, message: 'Blog Not Found' });
            return;
        }

        if (blog.likes.includes(userId)) {
            res.status(400).json({ success: false, message: 'Blog already liked by the user' });
            return;
        }

        blog.likes.push(userId);
        await blog.save();

        res.json({ success: true, message: 'Blog liked successfully' });
    } catch (err) {
        next(err);
    }
});

export const unlikeBlog = AsyncHandler(async (req, res, next) => {
    try {
        const slug = req.params.slug;
        const userId = req.user._id;

        const blog = await Blog.findOne({ slug });

        if (!blog) {
            res.status(404).json({ success: false, message: 'Blog Not Found' });
            return;
        }

        const userLikeIndex = blog.likes.indexOf(userId)

        blog.likes.splice(userLikeIndex, 1)

        await blog.save();

        res.json({ success: true, message: 'Blog unliked successfully' });

    } catch (err) {
        next(err)
    }
})



export const commentBlog = AsyncHandler(async (req, res, next) => {
    try {
        const slug = req.params.slug
        const userId = req.user._id
        const text = req.body.text

        const blog = await Blog.findOne({ slug })

        if (!blog) {
            res.status(404).json({ success: false, message: 'Blog Not Found' });
            return;
        }

        blog.comments.push({
            userId: userId,
            text: text,
        })
        await blog.save()

        res.json({ success: true, message: 'Blog commented successfully' });

    } catch (err) {
        next(err)
    }
})

export const getCommentLikeStatus = AsyncHandler(async (req, res, next) => {
    try {
        const slug = req.params.slug;
        const commentId = req.params.commentId;
        const userId = req.user._id

        const blog = await Blog.findOne({ slug });

        if (!blog) {
            res.status(404).json({ success: false, message: 'Blog Not Found' });
            return;
        }

        const comment = blog.comments.id(commentId);

        if (!comment) {
            res.status(404).json({ success: false, message: 'Comment Not Found' });
            return;
        }


        if (comment.likes.includes(userId)) {
            res.status(200).json({ isCommentLiked: true, commentId: commentId });
        } else {
            res.status(200).json({ isCommentLiked: false, commentId: commentId });
        }

    } catch (err) {
        next(err)
    }
});


export const likeComment = AsyncHandler(async (req, res, next) => {
    try {
        const slug = req.params.slug;
        const commentId = req.params.commentId;
        const userId = req.user._id

        const blog = await Blog.findOne({ slug });

        if (!blog) {
            res.status(404).json({ success: false, message: 'Blog Not Found' });
            return;
        }

        const comment = blog.comments.id(commentId);

        if (!comment) {
            res.status(404).json({ success: false, message: 'Comment Not Found' });
            return;
        }


        if (comment.likes.includes(userId)) {
            res.status(400).json({ success: false, message: 'You have already liked this comment' });
            return;
        }

        comment.likes.push(userId);
        await blog.save();

        res.json({ success: true, message: 'Comment Liked' });
    } catch (err) {
        next(err);
    }
});


export const unlikeComment = AsyncHandler(async (req, res, next) => {
    try {
        const slug = req.params.slug;
        const commentId = req.params.commentId;
        const userId = req.user._id

        const blog = await Blog.findOne({ slug });

        if (!blog) {
            res.status(404).json({ success: false, message: 'Blog Not Found' });
            return;
        }

        const comment = blog.comments.id(commentId);

        if (!comment) {
            res.status(404).json({ success: false, message: 'Comment Not Found' });
            return;
        }

        const userLikeIndex = comment.likes.indexOf(userId)

        comment.likes.splice(userLikeIndex, 1)

        await blog.save();

        res.json({ success: true, message: 'Comment Unliked' });
    } catch (err) {
        next(err);
    }
});


export const allComments = AsyncHandler(async (req, res, next) => {
    try {
        const slug = req.params.slug

        const blog = await Blog.findOne({ slug })
        if (!blog) {
            res.status(404).json({ success: false, message: 'Blog Not Found' });
            return;
        }
        res.json(blog.comments);

    } catch (err) {
        next(err)
    }
})



export const addSubComment = AsyncHandler(async (req, res, next) => {
    try {
        const slug = req.params.slug
        const commentId = req.params.commentId
        const userId = req.user._id
        const text = req.body.text

        const blog = await Blog.findOne({ slug })

        if (!blog) {
            res.status(404).json({ success: false, message: 'Blog Not Found' });
            return;
        }
        const comment = blog.comments.find((c) => c._id.toString() === commentId)

        if (!comment) {
            res.status(404).json({ success: false, message: 'Comment Not Found' });
            return;
        }

        const newSubComment = {
            userId: userId,
            text: text,
            timestamp: new Date(),
        }

        comment.subComments.push(newSubComment)

        await blog.save()

        res.json({ success: true, message: 'Sub-comment added successfully' });

    } catch {
        next(err)
    }
})


export const getSubCommentLikeStatus = AsyncHandler(async (req, res, next) => {
    try {

        const slug = req.params.slug;
        const commentId = req.params.commentId;
        const subCommentId = req.params.subCommentId;
        const userId = req.user._id


        const blog = await Blog.findOne({ slug });

        if (!blog) {
            res.status(404).json({ success: false, message: 'Blog Not Found' });
            return;
        }

        const comment = blog.comments.id(commentId);


        if (!comment) {
            res.status(404).json({ success: false, message: 'Comment Not Found' });
            return;
        }

        const subComment = comment.subComments.id(subCommentId)


        if (!subComment) {
            res.status(404).json({ success: false, message: 'Sub-comment Not Found' });
            return;
        }
        

        if (subComment.likes.includes(userId)) {
            res.status(200).json({ isSubCommentLiked: true, subCommentId: subCommentId });
        } else {
            res.status(200).json({ isSubCommentLiked: false, subCommentId: subCommentId });
        }

    } catch (err) {
        next(err)
    }
});



export const likeSubComment = AsyncHandler(async (req, res, next) => {
    try {
        const slug = req.params.slug;
        const commentId = req.params.commentId;
        const subCommentId = req.params.subCommentId;
        const userId = req.user._id

        const blog = await Blog.findOne({ slug });

        if (!blog) {
            res.status(404).json({ success: false, message: 'Blog Not Found' });
            return;
        }

        const comment = blog.comments.id(commentId);

        if (!comment) {
            res.status(404).json({ success: false, message: 'Comment Not Found' });
            return;
        }

        const subComment = comment.subComments.id(subCommentId);

        if (!subComment) {
            res.status(404).json({ success: false, message: 'Sub-comment Not Found' });
            return;
        }

        if (subComment.likes.includes(userId)) {
            res.status(400).json({ success: false, message: 'You have already liked this sub-comment' });
            return;
        }

        subComment.likes.push(userId);
        await blog.save();

        res.json({ success: true, message: 'Sub-comment Liked' });
    } catch (err) {
        next(err);
    }
});


export const unlikeSubComment = AsyncHandler(async (req, res, next) => {
    try {
        const slug = req.params.slug;
        const commentId = req.params.commentId;
        const subCommentId = req.params.subCommentId;
        const userId = req.user._id

        const blog = await Blog.findOne({ slug });

        if (!blog) {
            res.status(404).json({ success: false, message: 'Blog Not Found' });
            return;
        }

        const comment = blog.comments.id(commentId);

        if (!comment) {
            res.status(404).json({ success: false, message: 'Comment Not Found' });
            return;
        }

        const subComment = comment.subComments.id(subCommentId);

        if (!subComment) {
            res.status(404).json({ success: false, message: 'Sub-comment Not Found' });
            return;
        }

        const userLikeIndex = subComment.likes.indexOf(userId)

        subComment.likes.splice(userLikeIndex, 1)

        await blog.save();

      res.json({ success: true, message: 'SubComment Unliked' });

    } catch (err) {
        next(err);
    }
});


export const deleteComment = AsyncHandler(async (req, res, next) => {
    try {
        const slug = req.params.slug
        const commentId = req.params.commentId

        const blog = await Blog.findOne({ slug })

        if (!blog) {
            res.status(404).json({ success: false, message: 'Blog Not Found' });
            return;
        }

        const commentToDelete = blog.comments.id(commentId);

        if (!commentToDelete) {
            res.status(404).json({ success: false, message: 'Comment Not Found' });
            return;
        }

        if (commentToDelete.userId.toString() !== req.user._id.toString()) {
            res.status(401).json({ success: false, message: 'You Dont Have Permission' });
            return;
        }
        if (commentToDelete.subComments) {
            commentToDelete.subComments.forEach((subComments) => {
                commentToDelete.subComments.pull(subComments)
            })
        }

        blog.comments.pull(commentToDelete)

        await blog.save()

        res.status(200).json({
            success: true,
            message: "comment Deleted"
        })

    } catch (err) {
        next(err)
    }
})


export const deleteSubComment = AsyncHandler(async (req, res, next) => {
    try {
        const slug = req.params.slug
        const commentId = req.params.commentId
        const subCommentId = req.params.subCommentId

        const blog = await Blog.findOne({ slug })
        if (!blog) {
            res.status(404).json({ success: false, message: 'Blog Not Found' });
            return;
        }

        const comment = blog.comments.id(commentId)
        if (!comment) {
            res.status(404).json({ success: false, message: 'Comment Not Found' });
            return;
        }

        const subCommentToDelete = comment.subComments.id(subCommentId)


        if (!subCommentToDelete) {
            res.status(404).json({ success: false, message: 'Comment Not Found' });
            return;
        }

        if (subCommentToDelete.userId.toString() !== req.user._id.toString()) {
            res.status(401).json({ success: false, message: 'You Dont Have Permission' });
            return;
        }

        comment.subComments.pull(subCommentToDelete)
        await blog.save()

        res.json({ success: true, message: 'Sub-comment Deleted' });
    } catch (err) {
        next(err)
    }
})