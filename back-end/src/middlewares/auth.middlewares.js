import jwt from "jsonwebtoken";
import { findUserByIdRepository } from "../repositories/user.repository.js";

export const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    try {

        if (!authHeader) {
            return res.status(401).send({ message: "The token was not informed!" });
        }

        const parts = authHeader.split(" ");
        if (parts.length !== 2) {
            return res.status(401).send({ message: "Invalid token!" });
        }

        const [schema, token] = parts;
        if (!/^Bearer$/i.test(schema)) {
            return res.status(401).send({ message: "Malformatted Token!" });
        }

        if (parts.length !== 2 || schema !== "Bearer") {
            res.status(401).json({
                message: "Not authorized. Token invalid",
            });
        }

        jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
            if (error) {
                res.status(401).json({
                    message: error.message,
                });
            }

            const user = await findUserByIdRepository(decoded._id);

            if (!user || !user._id) {
                res.status(401).json({
                    message: "Token invalid",
                });
            }
            req.userId = user._id;
            next();
        });
    } catch (error) {
        res.status(500).json({
            data: error.message,
        });
    }
};
