import express from 'express';

import setupMiddlewares from '../config/middlewares';
import setupErrors from '../config/errors';
import setupRoutes from '../config/routes';

const app = express();

setupMiddlewares(app);
setupRoutes(app);
setupErrors(app);

export default app;
