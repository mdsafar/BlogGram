import express from "express"
import { changePassword, followUser,forgotPassword, forgotPasswordVerify, getAllUsers, getFollowStatus, getUserBySearch, getUserDetails, loginUser, logout, signupUser, unfollowUser, updateAccount, userAccount, verifyEmail } from "../Controllers/userController.js"
import { verifyAdmin, verifyUser } from "../Middlewares/authMiddleware.js"

const router = express.Router()

router.route("/signup").post(signupUser)
router.route('/verify-email').post(verifyEmail)

router.route("/login").post(loginUser)
router.route('/changePassword').put(verifyUser,changePassword)

router.route('/account').get(verifyUser,userAccount)
router.route('/account/update').put(verifyUser,updateAccount)

router.route('/:name').get(verifyUser,getUserDetails)

router.route('/:username/followStatus').get(verifyUser,getFollowStatus)
router.route('/follow/:userId').put(verifyUser,followUser)
router.route('/unfollow/:userId').put(verifyUser,unfollowUser)


router.route('/account/search').get(verifyUser,getUserBySearch)

router.route('/admin/users').get(verifyAdmin,getAllUsers)
router.route('/forgotPassword').post(forgotPassword)
router.route('/forgotPasswordVerify').post(forgotPasswordVerify)

router.route("/logout").post(verifyUser,logout)

export default router