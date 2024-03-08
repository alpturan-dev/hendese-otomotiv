import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
    {
        username: { type: String },
        password: { type: String },
    }
);

export const User = mongoose.model('User', userSchema, "users");

