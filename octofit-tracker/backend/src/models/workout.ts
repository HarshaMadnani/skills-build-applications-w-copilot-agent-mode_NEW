import mongoose, { Schema } from 'mongoose';

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

const Workout = mongoose.models.Workout ?? mongoose.model('Workout', workoutSchema);

export default Workout;
