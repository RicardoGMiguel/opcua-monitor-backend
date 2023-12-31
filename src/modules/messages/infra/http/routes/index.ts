import { Router } from 'express';
import messagesRouter from '@modules/messages/infra/http/routes/messages.routes';

const routes = Router();

routes.use('/messages', messagesRouter);

export default routes;
