import User from "../models/user";
import express from "express";
import jwt from "jsonwebtoken";

const createToken = (_id: string) => {
    if (!process.env.JWT_SECRET_KEY || !process.env.JWT_SECRET_PASSPHRASE) {
        throw Error("Internal Server Error: jwt env vars not found.");
    }

    const jwt_sec: jwt.Secret = {
        key: process.env.JWT_SECRET_KEY, passphrase: process.env.JWT_SECRET_PASSPHRASE
    };

    return jwt.sign({ _id }, jwt_sec, { expiresIn: process.env.JWT_EXPIRES_IN });
}

// login user
export const loginUser =async (req: Express.Request, res: Express.Response) => {
    
}

// sign up user
export const signUpUser = async (req: express.Request, res: express.Response) => {
    const { email, password } = req.body;
    try {
        const User_any: any = User;
        const user = await User_any.signup(email, password);

        // create token
        const token = createToken(user._id);

        res.status(200).json({ email, token });
    } catch(e) {
        res.status(400).json({ error: e });
    }
}
