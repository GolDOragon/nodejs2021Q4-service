import { BACKEND_PORT } from './common/config';
import { app } from './app';
import { logger } from './logger';

app.listen(BACKEND_PORT, () =>
  logger.info(`App is running on http://localhost:${BACKEND_PORT ?? ''}`)
);
