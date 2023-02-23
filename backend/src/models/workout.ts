import mongoose from "mongoose";

const Schema = mongoose.Schema

const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    }
}, {
    // automatically adds an identity and timestamp 
    timestamps: true
})

export default mongoose.model("Workout", workoutSchema);