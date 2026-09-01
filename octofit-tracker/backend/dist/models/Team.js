import mongoose, { Schema } from 'mongoose';
const teamSchema = new Schema({
    name: { type: String, required: true, unique: true },
    points: { type: Number, default: 0 },
    members: { type: Number, default: 0 },
    color: { type: String, default: 'blue' }
}, { timestamps: true });
const Team = mongoose.model('Team', teamSchema);
export default Team;
