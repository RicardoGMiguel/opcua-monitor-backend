import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';

import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IUpdateUserServiceRequest {
  user_id: string;
  email?: string;
  name?: string;
  oldPassword?: string;
  password?: string;
}

@injectable()
class UpdateUserService {
  constructor(
    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id, email, password, oldPassword, name }: IUpdateUserServiceRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('user not exist');
    }

    if (email) {
      const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);
      if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
        throw new AppError('Email alread in use');
      }

      user.email = email;
    }

    if (password && !oldPassword) {
      throw new AppError('You need to inform the old password to set a new pssword');
    }

    if (password && oldPassword) {
      const checkOldPassword = await this.hashProvider.compareHash(oldPassword, user.password);
      if (!checkOldPassword) {
        throw new AppError('The old password is wrong');
      }

      user.password = await this.hashProvider.generateHash(password);
    }

    if (name) user.name = name;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserService;
