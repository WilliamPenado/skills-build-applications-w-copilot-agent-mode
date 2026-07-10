import express from 'express';
import dotenv from 'dotenv';
import './config/database';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 8000);

app.use(express.json());

const getApiUrl = (serverPort: number) => {
  // Prefer an explicit API_URL env var for predictable responses in CI/tests.
  if (process.env.API_URL) return String(process.env.API_URL).trim();

  // Fall back to localhost. Avoid using CODESPACE_NAME to keep responses stable.
  return `http://localhost:${serverPort}`;
};

const apiUrl = getApiUrl(port);

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    message: 'OctoFit Tracker API is running',
    apiUrl,
  });
});

app.get(['/api/users', '/api/users/'], async (_req, res) => {
  const users = await User.find({}).lean();
  res.json({ resource: 'users', count: users.length, items: users, apiUrl });
});

app.post(['/api/users', '/api/users/'], async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json({ item: user, apiUrl });
});

app.get(['/api/teams', '/api/teams/'], async (_req, res) => {
  const teams = await Team.find({}).lean();
  res.json({ resource: 'teams', count: teams.length, items: teams, apiUrl });
});

app.post(['/api/teams', '/api/teams/'], async (req, res) => {
  const team = await Team.create(req.body);
  res.status(201).json({ item: team, apiUrl });
});

app.get(['/api/activities', '/api/activities/'], async (_req, res) => {
  const activities = await Activity.find({}).populate('userId').lean();
  res.json({ resource: 'activities', count: activities.length, items: activities, apiUrl });
});

app.post(['/api/activities', '/api/activities/'], async (req, res) => {
  const activity = await Activity.create(req.body);
  res.status(201).json({ item: activity, apiUrl });
});

app.get(['/api/leaderboard', '/api/leaderboard/'], async (_req, res) => {
  const leaderboard = await LeaderboardEntry.find({}).populate('userId').lean();
  res.json({ resource: 'leaderboard', count: leaderboard.length, items: leaderboard, apiUrl });
});

app.get(['/api/workouts', '/api/workouts/'], async (_req, res) => {
  const workouts = await Workout.find({}).lean();
  res.json({ resource: 'workouts', count: workouts.length, items: workouts, apiUrl });
});

app.post(['/api/workouts', '/api/workouts/'], async (req, res) => {
  const workout = await Workout.create(req.body);
  res.status(201).json({ item: workout, apiUrl });
});

const startServer = async () => {
  app.listen(port, '0.0.0.0', () => {
    console.log(`Backend listening on port ${port}`);
    console.log(`API URL: ${apiUrl}`);
  });
};

startServer();
