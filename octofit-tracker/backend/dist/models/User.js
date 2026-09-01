import mongoose, { Schema } from 'mongoose';
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    team: { type: String, required: true },
    role: { type: String, default: 'student' },
    fitnessLevel: { type: String, default: 'beginner' }
}, { timestamps: true });
const User = mongoose.model('User', userSchema);
export default User;
