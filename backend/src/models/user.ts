import mongoose from "mongoose";
import bcrypt from "bcrypt";

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
});

// static signup method
userSchema.statics.signup = async function (email: string, password: string) {
    const exists = await this.findOne({ email });

    if (exists) {
        throw Error("Email already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ email, password: hash });

    return user;
}

export default mongoose.model('User', userSchema); 