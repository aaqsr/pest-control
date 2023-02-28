import User from "../models/user";
import express from "express";

// login user
export const loginUser =async (req: Express.Request, res: Express.Response) => {
    
}

// sign up user
export const signUpUser = async (req: express.Request, res: express.Response) => {
    const { email, password } = req.body;
    try {
        const User_any: any = User;
        const user = await User_any.signup(email, password);
        res.status(200).json({ email, user });
    } catch(e) {
        res.status(400).json({ error: e });
    }
}
