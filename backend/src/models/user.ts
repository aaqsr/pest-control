import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
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
userSchema.statics.signup = async function (name: string, email: string, password: string) {

    // validation
    if (!name || !email || !password) {
        throw Error("Name, Email and Password are required.");
    }

    if (!validator.isEmail(email)) {
        throw Error("Email is not valid.")
    }

    if (!validator.isStrongPassword(password)) {
        throw Error("Password not strong enough.")
    }

    const exists = await this.findOne({ email });

    if (exists) {
        throw Error("Email already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ name, email, password: hash });

    return user;
}

// static login method
userSchema.statics.login = async function (email: string, password: string) {
    // validation
    if (!email || !password) {
        throw Error("Email and Password are required.")
    } 

    const user = await this.findOne({ email });

    if (!user) {
        throw Error("Incorrect Email");
    } 

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        throw Error("Invalid login");
    }

    return user;
}

export default mongoose.model('User', userSchema); 