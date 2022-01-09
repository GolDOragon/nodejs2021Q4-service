import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

export const {
  NODE_ENV,

  BACKEND_PORT,
  BACKEND_DEBUG_LEVEL,

  MONGO_CONNECTION_STRING,
  JWT_SECRET_KEY,
} = process.env;

export const AUTH_MODE = process.env.BACKEND_AUTH_MODE === 'true';
