import { Router } from 'express';
import { Segments, Joi, celebrate } from 'celebrate';

import MessagesController from '@modules/messages/infra/http/controllers/MessagesController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const messagesController = new MessagesController();

const messagesRouter = Router();

messagesRouter.get('/', ensureAuthenticated, messagesController.index);

messagesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      value: Joi.string().required().max(10),
    },
  }),
  messagesController.create,
);

messagesRouter.delete('/', ensureAuthenticated, messagesController.clearAll);

export default messagesRouter;
