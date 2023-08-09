import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';

@injectable()
class IndexUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(): Promise<User[] | undefined> {
    const users = await this.usersRepository.findAllUsers();

    return users;
  }
}

export default IndexUsersService;
