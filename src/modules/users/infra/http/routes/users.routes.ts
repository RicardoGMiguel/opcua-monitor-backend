import multer from 'multer';
import { Router } from 'express';
import { Segments, Joi, celebrate } from 'celebrate';

import uploadConfig from '@config/upload';

import UsersController from '@modules/users/infra/http/controllers/UsersController';
import UserAvatarController from '@modules/users/infra/http/controllers/UserAvatarController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

const upload = multer(uploadConfig.multer);

const usersRouter = Router();

usersRouter.get('/', ensureAuthenticated, usersController.index);

usersRouter.get('/:user_id', ensureAuthenticated, usersController.show);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      name: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

usersRouter.put(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().optional(),
      name: Joi.string().optional(),
      oldPassword: Joi.string().optional(),
      password: Joi.string().optional(),
      password_confirmation: Joi.string().when('password', { is: Joi.exist(), then: Joi.required().valid(Joi.ref('password')) }),
    },
  }),
  usersController.update,
);

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('file'), userAvatarController.update);

export default usersRouter;
