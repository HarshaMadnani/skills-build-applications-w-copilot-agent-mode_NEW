import mongoose, { Schema } from 'mongoose';

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

const Activity = mongoose.models.Activity ?? mongoose.model('Activity', activitySchema);

export default Activity;
