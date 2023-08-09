import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserService from '@modules/users/services/CreateUserService';
import ShowUserService from '@modules/users/services/ShowUserService';
import IndexUsersService from '@modules/users/services/IndexUsersService';
import UpdateUserService from '@modules/users/services/UpdateUserService';

export default class UsersController {
  public async index(req: Request, res: Response): Promise<Response> {
    const indexUsersService = container.resolve(IndexUsersService);

    const users = await indexUsersService.execute();

    return res.json(classToClass(users));
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { user_id } = req.params;

    const showUserService = container.resolve(ShowUserService);

    const user = await showUserService.execute({ user_id });

    return res.json(classToClass(user));
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;

    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({
      name,
      password,
      email,
    });

    return res.json(classToClass(user));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const { email, name, oldPassword, password } = req.body;

    const updateUserService = container.resolve(UpdateUserService);

    const updateUser = await updateUserService.execute({
      user_id,
      email,
      name,
      oldPassword,
      password,
    });

    return res.json(classToClass(updateUser));
  }
}
