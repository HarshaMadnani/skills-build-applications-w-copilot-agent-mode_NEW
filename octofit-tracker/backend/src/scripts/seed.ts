import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      { name: 'Avery Chen', email: 'avery.chen@example.com' },
      { name: 'Jordan Rivera', email: 'jordan.rivera@example.com' },
      { name: 'Sam Patel', email: 'sam.patel@example.com' },
      { name: 'Taylor Brooks', email: 'taylor.brooks@example.com' },
      { name: 'Morgan Lee', email: 'morgan.lee@example.com' },
      { name: 'Casey Kim', email: 'casey.kim@example.com' },
    ]);

    const teams = await Team.insertMany([
      {
        name: 'Trail Blazers',
        members: [users[0]._id, users[1]._id],
        points: 245,
      },
      {
        name: 'Pace Makers',
        members: [users[2]._id, users[3]._id],
        points: 220,
      },
      {
        name: 'Fit Futures',
        members: [users[4]._id, users[5]._id],
        points: 185,
      },
    ]);

    await Promise.all([
      User.updateMany(
        { _id: { $in: [users[0]._id, users[1]._id] } },
        { $set: { team: teams[0]._id } },
      ),
      User.updateMany(
        { _id: { $in: [users[2]._id, users[3]._id] } },
        { $set: { team: teams[1]._id } },
      ),
      User.updateMany(
        { _id: { $in: [users[4]._id, users[5]._id] } },
        { $set: { team: teams[2]._id } },
      ),
    ]);

    await Activity.insertMany([
      { user: users[0]._id, type: 'running', duration: 35, distance: 5.2, points: 85 },
      { user: users[1]._id, type: 'cycling', duration: 45, distance: 14, points: 80 },
      { user: users[2]._id, type: 'swimming', duration: 30, distance: 1.2, points: 75 },
      { user: users[3]._id, type: 'running', duration: 28, distance: 4, points: 70 },
      { user: users[4]._id, type: 'strength', duration: 40, points: 65 },
      { user: users[5]._id, type: 'walking', duration: 50, distance: 4.1, points: 60 },
      { user: users[0]._id, type: 'yoga', duration: 25, points: 45 },
      { user: users[2]._id, type: 'cycling', duration: 38, distance: 11, points: 55 },
    ]);

    await Leaderboard.insertMany([
      { user: users[0]._id, team: teams[0]._id, points: 130, rank: 1 },
      { user: users[1]._id, team: teams[0]._id, points: 115, rank: 2 },
      { user: users[2]._id, team: teams[1]._id, points: 120, rank: 3 },
      { user: users[3]._id, team: teams[1]._id, points: 100, rank: 4 },
      { user: users[4]._id, team: teams[2]._id, points: 100, rank: 5 },
      { user: users[5]._id, team: teams[2]._id, points: 85, rank: 6 },
    ]);

    await Workout.insertMany([
      {
        name: 'Easy Start Run',
        description: 'A relaxed run to build a consistent running habit.',
        type: 'running',
        duration: 25,
        difficulty: 'beginner',
      },
      {
        name: 'Steady Ride',
        description: 'A moderate cycling session focused on endurance.',
        type: 'cycling',
        duration: 40,
        difficulty: 'intermediate',
      },
      {
        name: 'Pool Intervals',
        description: 'Alternating swim intervals with short recovery breaks.',
        type: 'swimming',
        duration: 30,
        difficulty: 'intermediate',
      },
      {
        name: 'Full Body Strength',
        description: 'A balanced bodyweight strength circuit.',
        type: 'strength',
        duration: 35,
        difficulty: 'beginner',
      },
      {
        name: 'Mobility and Recovery',
        description: 'Gentle stretches and mobility exercises for recovery.',
        type: 'yoga',
        duration: 20,
        difficulty: 'beginner',
      },
    ]);

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    if (mongoose.connection.readyState !== 0) {
      try {
        await mongoose.disconnect();
      } catch (error) {
        console.error('Error disconnecting from octofit_db:', error);
        process.exitCode = 1;
      }
    }
  }
}

void seedDatabase();
