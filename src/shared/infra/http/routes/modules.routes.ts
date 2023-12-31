import { Router } from 'express';

import userRouter from '@modules/users/infra/http/routes';
import messagesRouter from '@modules/messages/infra/http/routes';

const routesList = [userRouter, messagesRouter];
const router = Router();

routesList.forEach(route => router.use('/', route));

export default router;
