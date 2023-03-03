import express from "express";
import jwt from "jsonwebtoken";
import user from "../models/user";

export const requireAuth = async (req: any, res: express.Response, next: Function) => {

    // verify authentication
    const { authorization } = req.headers;

    if (!authorization) {
        res.status(401).json({ error: "Authorization Token Required" });
    }

    const token = authorization.split(' ')[1];

    if (token) {
        try {
            if (process.env.JWT_SECRET_KEY) {
                const sec: jwt.Secret = process.env.JWT_SECRET_KEY;
                const { _id }: any = jwt.verify(token, sec);
                req.user = await user.findById(_id);

                next();
            } else { res.status(500).json({ error: "No jwt secret found in env." }) }
        } catch (error) {
            console.error(error);
            res.status(401).json({ error: "Request is not authorised" });
        }
    }
}