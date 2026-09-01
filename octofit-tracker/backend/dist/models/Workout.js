import mongoose, { Schema } from 'mongoose';
const workoutSchema = new Schema({
    title: { type: String, required: true },
    focus: { type: String, required: true },
    level: { type: String, required: true },
    durationMinutes: { type: Number, default: 30 }
}, { timestamps: true });
const Workout = mongoose.model('Workout', workoutSchema);
export default Workout;
