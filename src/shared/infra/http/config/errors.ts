import { Express } from 'express';
import { appErrorMiddleware, celebrateErrorMiddleware, defaultErrorMiddleware } from '../errors';

export default (app: Express): void => {
  app.use(appErrorMiddleware);
  app.use(celebrateErrorMiddleware);
  app.use(defaultErrorMiddleware);
};
