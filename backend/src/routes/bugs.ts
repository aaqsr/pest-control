import express from "express";
import { createBug, delBug, getBug, getBugs, updateBug } from "../controllers/bugController";
import { requireAuth } from "../middleware/requireAuth";

export const router = express.Router();

// user must be authenticated!
router.use(requireAuth);

router.get('/', getBugs);

router.get('/:id', getBug);

// Post a bug
router.post('/', createBug)

// Delete a bug
router.delete('/:id', delBug)

// Update a buongoose.Schema.Types.ObjectIdg
router.patch('/:id', updateBug)

export default router;
