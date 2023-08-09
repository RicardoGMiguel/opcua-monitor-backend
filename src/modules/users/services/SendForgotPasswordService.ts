import { injectable, inject } from 'tsyringe';
import path from 'path';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUserRepository from '@modules/users/repositories/IUsersRepository';
import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';

import AppError from '@shared/errors/AppError';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPassword {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUserRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UsersTokenRepository')
    private userTokenRepository: IUserTokenRepository,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const checkUserExists = await this.userRepository.findByEmail(email);

    if (!checkUserExists) {
      throw new AppError('User does not exist');
    }

    const { token } = await this.userTokenRepository.generate(checkUserExists.id);
    const forgotPasswordMailTemplate = path.resolve(__dirname, '..', 'views', 'forgotPassowds.hbs');

    await this.mailProvider.sendMail({
      to: {
        name: checkUserExists.name || 'usuario',
        email: checkUserExists.email,
      },
      subject: 'Recuperação senha',
      templateData: {
        file: forgotPasswordMailTemplate,
        variables: {
          name: checkUserExists.name || 'usuario',
          link: token,
        },
      },
    });
  }
}

export default SendForgotPassword;
