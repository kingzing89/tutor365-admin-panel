import { model, Schema } from 'mongoose';
export const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });
export const User = model('User', UserSchema);
