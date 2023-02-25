import express from "express";
import { createBug, delBug, getBugs } from "../controllers/bugController";

export const router = express.Router();

router.get('/', getBugs);

router.get('/:id', (req, res) => {
    res.json({msg: "GET one bug"});
});

// Post a bug
router.post('/', createBug)

// Delete a bug
router.delete('/:id', delBug)

// Update a buongoose.Schema.Types.ObjectIdg
router.patch('/:id', (req, res) => {
    res.json({msg: "Change a bug"})
})

export default router;
