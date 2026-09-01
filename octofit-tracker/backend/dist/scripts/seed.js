import mongoose from 'mongoose';
import User from '../models/User.js';
import Team from '../models/Team.js';
import Activity from '../models/Activity.js';
import LeaderboardEntry from '../models/LeaderboardEntry.js';
import Workout from '../models/Workout.js';
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose.connect(connectionString);
        console.log('Connected to octofit_db');
        await User.deleteMany({});
        await Team.deleteMany({});
        await Activity.deleteMany({});
        await LeaderboardEntry.deleteMany({});
        await Workout.deleteMany({});
        const users = await User.insertMany([
            { name: 'Ava Thompson', email: 'ava.thompson@example.com', team: 'Blue Sharks', role: 'captain', fitnessLevel: 'advanced' },
            { name: 'Liam Patel', email: 'liam.patel@example.com', team: 'Red Hawks', role: 'student', fitnessLevel: 'intermediate' },
            { name: 'Sophia Nguyen', email: 'sophia.nguyen@example.com', team: 'Blue Sharks', role: 'student', fitnessLevel: 'intermediate' },
            { name: 'Noah Kim', email: 'noah.kim@example.com', team: 'Red Hawks', role: 'student', fitnessLevel: 'beginner' }
        ]);
        await Team.insertMany([
            { name: 'Blue Sharks', points: 1320, members: 2, color: 'blue' },
            { name: 'Red Hawks', points: 1285, members: 2, color: 'red' }
        ]);
        await Activity.insertMany([
            { userId: users[0]._id, type: 'Run', durationMinutes: 35, calories: 290, date: new Date('2026-09-01T07:15:00Z') },
            { userId: users[1]._id, type: 'Strength', durationMinutes: 45, calories: 340, date: new Date('2026-09-01T08:00:00Z') },
            { userId: users[2]._id, type: 'Walk', durationMinutes: 25, calories: 160, date: new Date('2026-09-01T06:30:00Z') }
        ]);
        await LeaderboardEntry.insertMany([
            { rank: 1, name: 'Ava Thompson', points: 1320, team: 'Blue Sharks' },
            { rank: 2, name: 'Liam Patel', points: 1285, team: 'Red Hawks' },
            { rank: 3, name: 'Sophia Nguyen', points: 1200, team: 'Blue Sharks' }
        ]);
        await Workout.insertMany([
            { title: 'Cardio Blast', focus: 'Endurance', level: 'Intermediate', durationMinutes: 30 },
            { title: 'Strength Circuit', focus: 'Muscle Growth', level: 'Advanced', durationMinutes: 40 },
            { title: 'Mobility Flow', focus: 'Recovery', level: 'Beginner', durationMinutes: 20 }
        ]);
        console.log('Database seeding complete');
        console.log('Seeded users, teams, activities, leaderboard, and workouts for octofit_db');
        await mongoose.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
