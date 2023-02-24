import express from "express";
import mongoose from "mongoose";
import bug from "../models/bug";

export const router = express.Router();

router.get('/', (req, res) => {
    res.json({msg: "GET all bugs"});
});

router.get('/:id', (req, res) => {
    res.json({msg: "GET one bug"});
});

// Post a bug
interface reqBody { 
    title: String,
    load?: {
        description?: String,
        bug_level?: Number,
    },
    // assigned_to: mongoose.Schema.Types.ObjectId
    assigned_to?: String
}
router.post('/', async (req, res) => {
    const { title, load, assigned_to }: reqBody = req.body;
    
    const desc = load?.description;
    const bug_lvl = load?.bug_level;

    try {
        const bug_doc = await bug.create({title, desc, bug_lvl, assigned_to});
        res.status(200).json(bug_doc);
    } catch (error) {
        res.status(400).json({error: error}); // u messed up
    }
})

// Delete a bug
router.delete('/:id', (req, res) => {
    res.json({msg: "DELETE a bug"})
})

// Update a bug
router.patch('/:id', (req, res) => {
    res.json({msg: "Change a bug"})
})

export default router;
