import { Router } from 'express';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import passwordsRoutes from '@modules/users/infra/http/routes/passwords.routes';
import sessionsRoutes from '@modules/users/infra/http/routes/sessions.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/passwords', passwordsRoutes);
routes.use('/sessions', sessionsRoutes);

export default routes;
