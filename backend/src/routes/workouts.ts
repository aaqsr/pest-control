import express from "express";
import workout from "../models/workout";

export const router = express.Router();

router.get('/', (req, res) => {
    res.json({msg: "GET all workouts"});
});

router.get('/:id', (req, res) => {
    res.json({msg: "GET one workout"});
});

// Post a workout
router.post('/', async (req, res) => {
    const { title, load, reps } = req.body;
    
    try {
        const wkout_doc = await workout.create({title, load, reps});
        res.status(200).json(wkout_doc);
    } catch (error) {
        res.status(400).json({error: error}); // u messed up
    }
})

// Delete a workout
router.delete('/:id', (req, res) => {
    res.json({msg: "DELETE a new workout"})
})

// Update a workout
router.patch('/:id', (req, res) => {
    res.json({msg: "DELETE a new workout"})
})

export default router;
