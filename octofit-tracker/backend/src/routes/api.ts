import { Router } from 'express';
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js';

const router = Router();

const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

router.get('/', (_request, response) => {
  response.json({
    baseUrl,
    endpoints: ['users', 'teams', 'activities', 'leaderboard', 'workouts'].map(
      (resource) => `/api/${resource}/`,
    ),
  });
});

router.get('/users/', async (_request, response) => {
  response.json(await User.find().lean());
});

router.get('/teams/', async (_request, response) => {
  response.json(await Team.find().populate('members').lean());
});

router.get('/activities/', async (_request, response) => {
  response.json(await Activity.find().populate('user').lean());
});

router.get('/leaderboard/', async (_request, response) => {
  response.json(
    await Leaderboard.find()
      .populate('user')
      .populate('team')
      .sort({ rank: 1 })
      .lean(),
  );
});

router.get('/workouts/', async (_request, response) => {
  response.json(await Workout.find().lean());
});

export default router;
