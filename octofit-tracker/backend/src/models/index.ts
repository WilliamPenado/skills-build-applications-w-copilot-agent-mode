import mongoose, { Schema, model, Model } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  role: string;
  fitnessGoal: string;
  location: string;
}

export interface ITeam {
  name: string;
  description: string;
  focus: string;
  members: number;
}

export interface IActivity {
  userId: mongoose.Types.ObjectId;
  type: string;
  durationMinutes: number;
  caloriesBurned: number;
  distanceKm?: number;
  date: Date;
}

export interface ILeaderboardEntry {
  userId: mongoose.Types.ObjectId;
  name: string;
  points: number;
  streakDays: number;
  rank: number;
}

export interface IWorkout {
  title: string;
  description: string;
  difficulty: string;
  durationMinutes: number;
  equipment: string[];
  focus: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true, default: 'member' },
  fitnessGoal: { type: String, required: true },
  location: { type: String, required: true },
}, { timestamps: true });

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  focus: { type: String, required: true },
  members: { type: Number, required: true, default: 0 },
}, { timestamps: true });

const activitySchema = new Schema<IActivity>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  caloriesBurned: { type: Number, required: true },
  distanceKm: { type: Number },
  date: { type: Date, required: true, default: Date.now },
}, { timestamps: true });

const leaderboardEntrySchema = new Schema<ILeaderboardEntry>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  points: { type: Number, required: true, default: 0 },
  streakDays: { type: Number, required: true, default: 0 },
  rank: { type: Number, required: true },
}, { timestamps: true });

const workoutSchema = new Schema<IWorkout>({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  difficulty: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  equipment: { type: [String], required: true },
  focus: { type: String, required: true },
}, { timestamps: true });

export const User: Model<IUser> = model<IUser>('User', userSchema);
export const Team: Model<ITeam> = model<ITeam>('Team', teamSchema);
export const Activity: Model<IActivity> = model<IActivity>('Activity', activitySchema);
export const LeaderboardEntry: Model<ILeaderboardEntry> = model<ILeaderboardEntry>('LeaderboardEntry', leaderboardEntrySchema);
export const Workout: Model<IWorkout> = model<IWorkout>('Workout', workoutSchema);
