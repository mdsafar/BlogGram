import User from "../Models/userModel.js"
import Blog from "../Models/blogModel.js"
import AsyncHandler from "express-async-handler"
import { sendToken } from "../utils/jwtToken.js"
import { generateOtp } from "../utils/getOtp.js"
import VerificationToken from "../Models/UserVerification.js"
import cloudinary from 'cloudinary'
import { sendMail } from "../utils/mail.js"




export const signupUser = AsyncHandler(async (req, res, next) => {
    try {
        const { username, fullname, email, password } = req.body

        const isExisting = await User.findOne({ email })
        const isUsernameExist = await User.findOne({ username })

        if (isExisting) {
            throw new Error("Email Already In Use!")
        }

        if (isUsernameExist) {
            throw new Error("Username already taken. Try another one")
        }

        const user = new User({
            username,
            fullname,
            email,
            password,
        })
        await user.save();

        const Otp = generateOtp();
        const verificationToken = new VerificationToken({ user: user._id, token: Otp });
        await verificationToken.save();

        await sendMail({ to: email, OTP: Otp });

        res.json({user,success:true})
    } catch (err) {
        next(err)
    }
})



export const verifyEmail = AsyncHandler(async (req, res, next) => {
    try {
        const { userId, otp } = req.body

        const user = await User.findById(userId);

        if (!user) {
            throw new Error('User Not Found')
        }

        const verificationToken = await VerificationToken.findOne({ user: user._id })
        if (!verificationToken) {
            throw new Error('Verification Token Not Found')
        }
        const isOtpValid = await verificationToken.matchToken(otp)

        if (isOtpValid) {
            user.emailVerified = true
            await user.save()
        } else {
            throw new Error("Invalid Otp")
        }

        sendToken(user, 201, res)
    } catch (err) {
        next(err)
    }
})


export const loginUser = AsyncHandler(async (req, res, next) => {
    try {
        const { username, password } = req.body

        if (!username || !password) {
            res.status(400)
            throw new Error("Please Enter email and Password")
        }

        const user = await User.findOne({ username })

        if (!user) {
            res.status(404)
            throw new Error("User not Found")
        }

        const checkedPassword = await user.matchPassword(password)

        if (!checkedPassword) {
            res.status(401)
            throw new Error('Invalid Username or Password')
        }

        sendToken(user, 200, res)

    } catch (err) {
        next(err)
    }
})

export const changePassword = AsyncHandler(async (req, res, next) => {
    const userId = req.user._id
    const { oldPass, newPass } = req.body
    try {
        const user = await User.findById(userId)

        if (user && (await user.matchPassword(oldPass))) {
            user.password = newPass
            await user.save()
            res.json({ success: true })
        } else {
            throw new Error("Incorrect Old Password")
        }
    } catch (err) {
        next(err)
    }
})

export const forgotPassword = AsyncHandler(async (req, res, next) => {
    try {
        const { email } = req.body

        const user = await User.findOne({ $and: [{ email: email }, { emailVerified: true }] })

        if (user) {
            await VerificationToken.deleteOne({ owner: user._id })

            const Otp = generateOtp()
            const verificationToken = new VerificationToken({
                user: user._id,
                token: Otp
            })
            res.status(200).json({message:"OTP Sent"});

            await sendMail({ to: user.email, OTP: Otp })
            await verificationToken.save()

        } else {
            throw new Error("User Not Found")
        }
    } catch (err) {
        next(err)
    }
})

export const forgotPasswordVerify = AsyncHandler(async (req, res, next) => {
    try {
        const { email, otp, password } = req.body

        const user = await User.findOne({ email: email })

        if (!user) {
            throw new Error("No User Found")
        }

        if (user) {
            const id = user?._id
            const token = await VerificationToken.findOneAndDelete({ user: id })

            if (!token) {
                throw new Error('Token Expires');
            }

            const isOtpValid = await token.matchToken(otp)

            if (!isOtpValid) {
                throw new Error('Invalid Otp');
            }
            if (isOtpValid) {
                user.password = password
                await user.save()
                res.json({
                    success: true,
                    message: "Rested Password"
                })
            } else {
                throw new Error('Validation Failed')
            }
        }

    } catch (err) {
        next(err)
    }
})


export const userAccount = AsyncHandler(async (req, res, next) => {
    try {
        const id = req.user._id

        const user = await User.findById(id)
        .populate('followers')
        .populate('following')

        if (!user) {
            throw new Error("User Not Found")
        }
        const blogs = await Blog.find({ userId: id })

        res.json({
            user,
            blogs
        })

    } catch (err) {
        console.log(err)
        next(err)
    }
})

export const updateAccount = AsyncHandler(async (req, res, next) => {
    try {
        const { username, fullname, bio } = req.body
        const userId = req.user._id

        const newData = {
            username,
            fullname,
            bio
        }


        if (req.body.avatar === "remove") {
            newData.avatar = {
                public_id: "default_img",
                url: "https://i.pinimg.com/736x/85/76/b9/8576b9b3558132762f387f216b9495e9.jpg"
            }
        } else if (req.body.avatar !== "") {
            const user = await User.findById(userId);
            if (user.avatar && user.avatar.public_id) {
                await cloudinary.v2.uploader.destroy(user.avatar.public_id);
            }

            const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
                folder: "avatars",
                quality: 'auto:best'
            });

            newData.avatar = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            };
        }

        const user = await User.findByIdAndUpdate(userId, newData, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })

        res.status(200).json({ success: true, user })

    } catch (err) {
        next(err)
    }
})


export const getUserBySearch = AsyncHandler(async (req, res, next) => {
    try {
        const name = new RegExp(req.query.name, "i")
        const userId = req.user._id

        const users = await User.find({ username: name, _id: { $ne: userId } })

        if (users.length === 0) {
            res.status(404)
            throw new Error("No User Found")
        } else {
            res.json(users);
        }

    } catch (err) {
        next(err)
    }
})

export const getUserDetails = AsyncHandler(async (req, res, next) => {
    try {
        const name = req.params.name

        const user = await User.findOne({ username: name })
            .populate('followers')
            .populate('following')

        if (!user) {
            return res.status(404).json("User Not Found")
        }

        const blogs = await Blog.find({ userId: user?._id })

        return res.status(200).json({ user, blogs })

    } catch (err) {

        next(err)
    }
})


export const getFollowStatus = AsyncHandler(async (req, res, next) => {
    try {
        const userId = req.user._id;
        const targetUserName = req.params.username;

        const user = await User.findOne({ username: targetUserName });

        if (user.followers.includes(userId)) {
            res.status(200).json({
                username: targetUserName,
                isFollowing: true,
            });
        } else {
            res.status(200).json({
                username: targetUserName,
                isFollowing: false,
            });
        }

    } catch (err) {
        next(err)
    }
});


export const followUser = AsyncHandler(async (req, res) => {
    try {
        const userId = req.params.userId;
        const followerId = req.user._id;


        const user = await User.findById(userId);

        if (user.followers.includes(followerId)) {
            return res.status(400).json({ error: 'You are already following this user' });
        }

        user.followers.push(followerId);
        await user.save();


        const follower = await User.findById(followerId);
        follower.following.push(userId);
        await follower.save();

        res.json({ success: true, message: "You are now following the user." });

    } catch (error) {
        res.status(500).json({ error: 'An error occurred.' });
    }
});

export const unfollowUser = AsyncHandler(async (req, res) => {
    try {
        const userId = req.params.userId;
        const followerId = req.user._id;

        await User.findByIdAndUpdate(userId, { $pull: { followers: followerId } });

        await User.findByIdAndUpdate(followerId, { $pull: { following: userId } });

        res.json({ success: true, message: "You have unfollowed the user " });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred.' });
    }
});


export const getAllUsers = AsyncHandler(async (req, res, next) => {
    try {
        const userId = req.user._id
        const users = await User.find({_id: { $ne: userId } })
        res.json(users)

    } catch (err) {
        next(err)
    }
})



export const logout = AsyncHandler(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged Out",
    });
});
