import express, { Express, Request, Response } from 'express';
import uploadConfig from '@config/upload';

import frontEnd, { frontEndFolder } from '../routes/frontEnd.routes';
import modules from '../routes/modules.routes';

export default (app: Express): void => {
  app.use(express.static(frontEndFolder));
  app.use('/app*', frontEnd);

  app.use('/api', modules);

  app.use('/hello', (req: Request, res: Response): void => {
    res.send('hello from api');
  });

  app.use('/files', express.static(uploadConfig.uploadsFolder));
};
