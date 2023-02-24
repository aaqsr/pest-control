import mongoose from "mongoose";

const Schema = mongoose.Schema

const bugSchema = new Schema({
    title: {
        type: String,
        required: true,
        // TODO implement this on the front end?
        length: 40
    },
    description: {
        type: String,
        default: "",
        required: false
    },
    bug_level: {
        // 0 - 3, 
        // 0 is Priority yet to be assigned
        // 1 is Low priority bug
        // 2 is Medium priority bug
        // 3 is app-breaking catastrophic high priority bug
        type: Number,
        default: 0,
        required: false
    },
    assigned_to: {
        // type: mongoose.Schema.Types.ObjectId, ref: 'User',
        // will eventually become this ^^^ but for now, 
        type: String,
        default: "",
        // TODO Make an unassigned user
        required: false
    }
}, {
    // automatically adds an identity and timestamp 
    timestamps: true
})

export default mongoose.model("Bug", bugSchema);