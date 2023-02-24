import express from "express";
import { createBug } from "../controllers/bugController";

export const router = express.Router();

router.get('/', (req, res) => {
    res.json({msg: "GET all bugs"});
});

router.get('/:id', (req, res) => {
    res.json({msg: "GET one bug"});
});

// Post a bug
router.post('/', createBug)

// Delete a bug
router.delete('/:id', (req, res) => {
    res.json({msg: "DELETE a bug"})
})

// Update a buongoose.Schema.Types.ObjectIdg
router.patch('/:id', (req, res) => {
    res.json({msg: "Change a bug"})
})

export default router;
