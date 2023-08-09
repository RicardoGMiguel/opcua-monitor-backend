import { Router } from 'express';

import userRouter from '@modules/users/infra/http/routes';

const routesList = [userRouter];
const router = Router();

routesList.forEach(route => router.use('/', route));

export default router;
