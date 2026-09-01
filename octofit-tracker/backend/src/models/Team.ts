import mongoose, { Schema, type Document } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  points: number;
  members: number;
  color?: string;
}

const teamSchema = new Schema<ITeam>(
  {
    name: { type: String, required: true, unique: true },
    points: { type: Number, default: 0 },
    members: { type: Number, default: 0 },
    color: { type: String, default: 'blue' }
  },
  { timestamps: true }
);

const Team = mongoose.model<ITeam>('Team', teamSchema);

export default Team;
