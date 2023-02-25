import express from "express";
import Bug from "../models/bug";
import mongoose from "mongoose";

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
        const bug_doc = await Bug.create({title, desc, bug_lvl, assigned_to});
        res.status(200).json(bug_doc);
    } catch (error) {
        res.status(400).json({error: error}); // u messed up
    }
}

// get all Bugs
// TODO: Pagination?
export const getBugs = async (req: express.Request, res: express.Response) => {
    // find {} -> find everything and return everything
    // sort createdAt: -1 -> sort by created timestamp in descending (hence the -1)
    const bugs = await Bug.find({}).sort({ createdAt: -1 });
    // gives us all bugs in an array

    res.status(200).json(bugs);
}

// get a spefic bug from the bug id
export const getBug = async (req:express.Request, res:express.Response) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) { 
        res.status(404).json({error: "Invalid Id"})
        return;
    }

    const bg = await Bug.findById(id);

    if (!bg) { 
        res.status(404).json({error: "No such bug"})
        return;
    }

    res.status(200).json(bg);
}

export const delBug = async (req:express.Request, res: express.Response) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) { 
        res.status(404).json({error: "Invalid Id"})
        return;
    } 

    // same thing as find by id and del. 
    // this finds the bug with the _id 
    // field equal to the id 
    const bg = await Bug.findOneAndDelete({ _id: id });

    if (!bg) {
        res.status(404).json({ error: "No such bug" });
        return;
    }

    res.status(200).json(bg);
}

export const updateBug = async (req: express.Request, res: express.Response) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ error: "Invalid Id" })
        return;
    }

    const bg = await Bug.findByIdAndUpdate(id, { ...req.body })

    if (!bg) {
        res.status(404).json({ error: "No such bug" });
        return;
    }

    const bg_new = await Bug.findById(id);

    res.status(200).json(bg_new);
}