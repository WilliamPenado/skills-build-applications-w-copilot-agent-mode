"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
require("./config/database");
const models_1 = require("./models");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = Number(process.env.PORT || 8000);
app.use(express_1.default.json());
const getApiUrl = (serverPort) => {
    // Prefer an explicit API_URL env var for predictable responses in CI/tests.
    if (process.env.API_URL)
        return String(process.env.API_URL).trim();
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
    const users = await models_1.User.find({}).lean();
    res.json({ resource: 'users', count: users.length, items: users, apiUrl });
});
app.post(['/api/users', '/api/users/'], async (req, res) => {
    const user = await models_1.User.create(req.body);
    res.status(201).json({ item: user, apiUrl });
});
app.get(['/api/teams', '/api/teams/'], async (_req, res) => {
    const teams = await models_1.Team.find({}).lean();
    res.json({ resource: 'teams', count: teams.length, items: teams, apiUrl });
});
app.post(['/api/teams', '/api/teams/'], async (req, res) => {
    const team = await models_1.Team.create(req.body);
    res.status(201).json({ item: team, apiUrl });
});
app.get(['/api/activities', '/api/activities/'], async (_req, res) => {
    const activities = await models_1.Activity.find({}).populate('userId').lean();
    res.json({ resource: 'activities', count: activities.length, items: activities, apiUrl });
});
app.post(['/api/activities', '/api/activities/'], async (req, res) => {
    const activity = await models_1.Activity.create(req.body);
    res.status(201).json({ item: activity, apiUrl });
});
app.get(['/api/leaderboard', '/api/leaderboard/'], async (_req, res) => {
    const leaderboard = await models_1.LeaderboardEntry.find({}).populate('userId').lean();
    res.json({ resource: 'leaderboard', count: leaderboard.length, items: leaderboard, apiUrl });
});
app.get(['/api/workouts', '/api/workouts/'], async (_req, res) => {
    const workouts = await models_1.Workout.find({}).lean();
    res.json({ resource: 'workouts', count: workouts.length, items: workouts, apiUrl });
});
app.post(['/api/workouts', '/api/workouts/'], async (req, res) => {
    const workout = await models_1.Workout.create(req.body);
    res.status(201).json({ item: workout, apiUrl });
});
const startServer = async () => {
    app.listen(port, '0.0.0.0', () => {
        console.log(`Backend listening on port ${port}`);
        console.log(`API URL: ${apiUrl}`);
    });
};
startServer();
