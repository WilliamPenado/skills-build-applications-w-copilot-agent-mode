"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const models_1 = require("../models");
dotenv_1.default.config();
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('Connected to octofit_db');
        await Promise.all([
            models_1.User.deleteMany({}),
            models_1.Team.deleteMany({}),
            models_1.Activity.deleteMany({}),
            models_1.LeaderboardEntry.deleteMany({}),
            models_1.Workout.deleteMany({}),
        ]);
        const users = await models_1.User.insertMany([
            {
                name: 'Avery Chen',
                email: 'avery.chen@example.com',
                role: 'admin',
                fitnessGoal: 'Train for a half marathon',
                location: 'Seattle',
            },
            {
                name: 'Jordan Rivera',
                email: 'jordan.rivera@example.com',
                role: 'member',
                fitnessGoal: 'Build strength and endurance',
                location: 'Austin',
            },
            {
                name: 'Morgan Patel',
                email: 'morgan.patel@example.com',
                role: 'member',
                fitnessGoal: 'Improve mobility',
                location: 'Denver',
            },
        ]);
        await models_1.Team.insertMany([
            {
                name: 'Trail Blazers',
                description: 'A team focused on endurance and weekend hikes.',
                focus: 'endurance',
                members: 3,
            },
            {
                name: 'Power Squad',
                description: 'A strength-focused crew that loves lifting and recovery.',
                focus: 'strength',
                members: 2,
            },
        ]);
        await models_1.Activity.insertMany([
            {
                userId: users[0]._id,
                type: 'run',
                durationMinutes: 35,
                caloriesBurned: 420,
                distanceKm: 5.2,
                date: new Date('2026-07-09T07:30:00.000Z'),
            },
            {
                userId: users[1]._id,
                type: 'strength',
                durationMinutes: 50,
                caloriesBurned: 310,
                date: new Date('2026-07-08T18:15:00.000Z'),
            },
            {
                userId: users[2]._id,
                type: 'yoga',
                durationMinutes: 30,
                caloriesBurned: 180,
                date: new Date('2026-07-07T06:00:00.000Z'),
            },
        ]);
        await models_1.LeaderboardEntry.insertMany([
            {
                userId: users[0]._id,
                name: users[0].name,
                points: 1250,
                streakDays: 12,
                rank: 1,
            },
            {
                userId: users[1]._id,
                name: users[1].name,
                points: 1180,
                streakDays: 8,
                rank: 2,
            },
            {
                userId: users[2]._id,
                name: users[2].name,
                points: 1125,
                streakDays: 6,
                rank: 3,
            },
        ]);
        await models_1.Workout.insertMany([
            {
                title: 'Morning HIIT',
                description: 'A fast-paced interval workout for cardio and calorie burn.',
                difficulty: 'Intermediate',
                durationMinutes: 20,
                equipment: ['mat', 'jump rope'],
                focus: 'cardio',
            },
            {
                title: 'Core Flow',
                description: 'Gentle core strengthening with mobility and breath work.',
                difficulty: 'Beginner',
                durationMinutes: 15,
                equipment: ['mat'],
                focus: 'mobility',
            },
            {
                title: 'Strength Builder',
                description: 'Compound movements to build strength and confidence.',
                difficulty: 'Advanced',
                durationMinutes: 45,
                equipment: ['dumbbells', 'bench'],
                focus: 'strength',
            },
        ]);
        console.log('Database seeding complete');
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
