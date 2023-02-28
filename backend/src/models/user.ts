import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    projects: {
        type: [{
            id: {
                type: String,
                required: true
            },
            admin: {
                type: Boolean,
                required: false,
                default: false
            }
        }],
        required: false,
        default: []
    }
})