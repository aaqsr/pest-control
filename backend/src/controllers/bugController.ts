import express from "express";
import bug from "../models/bug";

// create a new Bug
interface reqBody { 
    title: String,
    load?: {
        description?: String,
        bug_level?: Number,
    },
    // assigned_to: mongoose.Schema.Types.ObjectId
    assigned_to?: String
}

export const createBug = async (req: express.Request, res: express.Response) => {
    const { title, load, assigned_to }: reqBody = req.body;
    
    const desc = load?.description;
    const bug_lvl = load?.bug_level;

    try {
        const bug_doc = await bug.create({title, desc, bug_lvl, assigned_to});
        res.status(200).json(bug_doc);
    } catch (error) {
        res.status(400).json({error: error}); // u messed up
    }
}