import express, { type Request, type Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDatabase } from './config/database.js';
import User from './models/User.js';
import Team from './models/Team.js';
import Activity from './models/Activity.js';
import LeaderboardEntry from './models/LeaderboardEntry.js';
import Workout from './models/Workout.js';

dotenv.config();

const app = express();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(cors());
app.use(express.json());

function formatDocument<T extends Record<string, unknown>>(doc: T) {
  const serialized = { ...doc } as Record<string, unknown>;
  if (serialized._id) {
    serialized.id = serialized._id;
    delete serialized._id;
  }
  if (serialized.__v !== undefined) {
    delete serialized.__v;
  }
  return serialized;
}

function registerCollectionEndpoints(resource: string, model: any) {
  const path = `/api/${resource}`;

  app.get(path, async (_req: Request, res: Response) => {
    const documents = await model.find({}).lean();

    res.json({
      message: `${resource.charAt(0).toUpperCase() + resource.slice(1)} retrieved successfully`,
      baseUrl,
      data: documents.map((doc: Record<string, unknown>) => formatDocument(doc))
    });
  });

  app.get(`${path}/`, async (_req: Request, res: Response) => {
    const documents = await model.find({}).lean();

    res.json({
      message: `${resource.charAt(0).toUpperCase() + resource.slice(1)} retrieved successfully`,
      baseUrl,
      data: documents.map((doc: Record<string, unknown>) => formatDocument(doc))
    });
  });

  app.post(`${path}/`, async (req: Request, res: Response) => {
    const created = await model.create(req.body);

    res.status(201).json({
      message: `${resource.charAt(0).toUpperCase() + resource.slice(1)} created successfully`,
      baseUrl,
      data: formatDocument(created.toObject())
    });
  });
}

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    message: 'OctoFit Tracker API is running',
    baseUrl
  });
});

registerCollectionEndpoints('users', User);
registerCollectionEndpoints('teams', Team);
registerCollectionEndpoints('activities', Activity);
registerCollectionEndpoints('leaderboard', LeaderboardEntry);
registerCollectionEndpoints('workouts', Workout);

async function startServer() {
  try {
    await connectDatabase();
    app.listen(port, () => {
      console.log(`OctoFit Tracker backend listening on port ${port}`);
      console.log(`API base URL: ${baseUrl}`);
    });
  } catch (error) {
    console.error('Failed to start OctoFit Tracker backend:', error);
    process.exit(1);
  }
}

startServer();
