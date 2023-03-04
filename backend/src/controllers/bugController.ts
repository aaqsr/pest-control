import express from "express";
import Bug from "../models/bug";
import mongoose from "mongoose";

// create a new Bug
interface reqBody { 
    title: String,
    description?: String,
    bug_level?: Number,
    // assigned_to: mongoose.Schema.Types.ObjectId
    assigned_to?: String,
    owner_id: String
}

export const createBug = async (req: any, res: express.Response) => {
    const { title, description, bug_level, assigned_to, owner_id }: reqBody = req.body;

    let emptyFields = []

    if (!title) {
        emptyFields.push('title')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }

    try {
        const owner_id = req.user._id;
        const bug_doc = await Bug.create({ title, description, bug_level, assigned_to, owner_id })
        res.status(200).json(bug_doc);
    } catch (error) {
        res.status(400).json({error: error}); // u messed up
    }
}

// get all Bugs
// TODO: Pagination?
export const getBugs = async (req: any, res: express.Response) => {
    const owner_id = req.user._id;
    // find {} -> find everything and return everything
    // sort createdAt: -1 -> sort by created timestamp in descending (hence the -1)
    const bugs = await Bug.find({ owner_id }).sort({ createdAt: -1 });
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