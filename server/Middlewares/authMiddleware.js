import Jwt from "jsonwebtoken"
import AsyncHandler from "express-async-handler"
import User from "../Models/userModel.js"

const verifyToken = AsyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies.token


        if (!token) {
            throw new Error("Un Authorized")
        }

        const decodedData = Jwt.verify(token, process.env.JWT_SECRET_KEY)
        const user = await User.findById(decodedData.id)

        if (!user) {
            throw new Error("User Not Found")
        }

        req.user = user

        next()

    } catch (err) {
        next(err)
    }
})

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user) {
            if (req.user.id === req.params.id || req.user.role === "admin" || req.user.role === "user") {
                next();
            } else {
                res.status(401);
                next(new Error("You're not authenticated"));
            }
        } else {
            const error = new Error("You're not authenticated");
            res.status(401);
            next(error);
        }
    });
};

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user && req.user.role === "admin") {
            next();
        } else {
            const errorMessage = req.user ? `Role: ${req.user.role} is not allowed to access this resource` : "You're not authenticated";
            res.status(401).send(errorMessage);
            next(new Error(errorMessage));
        }
    });
};