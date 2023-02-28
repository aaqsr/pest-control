import { model, Schema } from "mongoose";

const orgSchema = new Schema({
    name: {
        type: String,
        required: true,
        length: 40
    },
    users: {
        // will hold user's IDs
        // this will lead to high database reads, but I don't care
        type: [String],
        default: [],
        // at least one user, the person who created it
        required: true
    },
    bugs: {
        type: [String],
        default: [],
        required: false
    }
}, {
    // automatically adds an identity and timestamp 
    timestamps: true
})

export default model("Org", orgSchema);