import mongoose from "mongoose";
import bcrypt from "bcrypt"
import Jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        maxLength: [15, "Name cannot exceed 20 characters"],
        minLength: [4, "Name should have more than 4 characters"],
        lowercase: true,
        unique: true
    },
    fullname: {
        type: String,
        required: true,
        maxLength: 15,
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
    },
    emailVerified: {
        type: Boolean,
        default: false,
        required: true
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minLength: [8, "Password should be greater than 8 characters"],
    },
    avatar: {
        public_id: {
            type: String,
            default: "default_img"
        },
        url: {
            type: String,
            default:"https://i.pinimg.com/736x/85/76/b9/8576b9b3558132762f387f216b9495e9.jpg"
        }
    },
    bio: {
        type: String,
        maxLength: 150
    },
    role: {
        type: String,
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: []
        },
    ],

    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: []
        },
    ],

},
    {
        timestamps: true,
    },
)

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)

})

userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.getJwtToken = function () {
    return Jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE
    })
}
const User = mongoose.model('User', userSchema);

export default User