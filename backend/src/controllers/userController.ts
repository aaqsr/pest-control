import User from "../models/user";
import express from "express";
import jwt from "jsonwebtoken";

const createToken = (_id: string) => {
    if (!process.env.JWT_SECRET_KEY) {
        throw Error("Internal Server Error: jwt env vars not found.");
    }

    const jwt_sec: jwt.Secret = process.env.JWT_SECRET_KEY;

    return jwt.sign({ _id }, jwt_sec, { expiresIn: process.env.JWT_EXPIRES_IN });
}

// login user
export const loginUser =async (req: express.Request, res: express.Response) => {
    const { email, password } = req.body;
    try {
        const User_any: any = User;
        const user = await User_any.login(email, password);
        const name = user.name;

        // create token
        const token = createToken(user._id);

        res.status(200).json({ name, email, token });
    } catch(error: any) {
        res.status(400).json({ error: error.message });
    } 
}

// sign up user
export const signUpUser = async (req: express.Request, res: express.Response) => {
    const { name, email, password } = req.body;

    try {
        const User_any: any = User;
        const user = await User_any.signup(name, email, password);

        // create token
        const token = createToken(user._id);

        res.status(200).json({ name, email, token });
    } catch(error: any) {
        res.status(400).json({ error: error.message });
    }
}
