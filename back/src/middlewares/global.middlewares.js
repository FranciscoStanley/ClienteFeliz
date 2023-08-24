import mongoose from "mongoose";
import { findUserByIdRepository } from "../repositories/user.repository.js";

export const validId = async (req, res, next) => {
    const _id = req.params._id;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({
            data: {
                message: "Id not is valid!",
            },
        });
    }
    next();
};

export const validUser = async (req, res, next) => {
    const _id = req.params._id;
    const user = await findUserByIdRepository(_id);

    if (!user) {
        return res.status(400).json({
            data: {
                message: "User not found!",
            },
        });
    }

    req._id = _id;
    req.user = user;
    req.userId = user._id;

    next();
};
