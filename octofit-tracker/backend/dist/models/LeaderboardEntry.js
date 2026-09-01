import mongoose, { Schema } from 'mongoose';
const leaderboardEntrySchema = new Schema({
    rank: { type: Number, required: true },
    name: { type: String, required: true },
    points: { type: Number, required: true },
    team: { type: String, default: 'OctoFit' }
}, { timestamps: true });
const LeaderboardEntry = mongoose.model('LeaderboardEntry', leaderboardEntrySchema);
export default LeaderboardEntry;
