import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
  },
  { timestamps: true },
);

const teamSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    points: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true },
);

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true, trim: true },
    duration: { type: Number, required: true, min: 0 },
    distance: { type: Number, min: 0 },
    points: { type: Number, default: 0, min: 0 },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

const leaderboardSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
  },
  { timestamps: true },
);

const workoutSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    type: { type: String, trim: true },
    duration: { type: Number, min: 0 },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'] },
  },
  { timestamps: true },
);

export const User = mongoose.models.User ?? mongoose.model('User', userSchema);
export const Team = mongoose.models.Team ?? mongoose.model('Team', teamSchema);
export const Activity = mongoose.models.Activity ?? mongoose.model('Activity', activitySchema);
export const Leaderboard =
  mongoose.models.Leaderboard ?? mongoose.model('Leaderboard', leaderboardSchema);
export const Workout = mongoose.models.Workout ?? mongoose.model('Workout', workoutSchema);
