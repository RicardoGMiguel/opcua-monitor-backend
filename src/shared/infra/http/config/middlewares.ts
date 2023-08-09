import { Express } from 'express';
import { bodyParseMiddleware, corsMiddleware, raterLimiterMiddleware, noCacheMiddleware, celebrateMiddleware } from '../middlewares';

export default (app: Express): void => {
  app.use(corsMiddleware);
  app.use(bodyParseMiddleware);
  app.use(raterLimiterMiddleware);
  app.use(noCacheMiddleware);
  app.use(celebrateMiddleware);
};
