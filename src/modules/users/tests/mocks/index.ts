import FakeUserRepository from '@modules/users/tests/fakeRepositories/FakeUserRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import FakeUserTokenRepository from '@modules/users/tests/fakeRepositories/FakeUserTokenRepository';
import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';

import FakeHashProvider from '@modules/users/tests/fakeProviders/FakeHashProvider';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import CreateUserService from '@modules/users/services/CreateUserService';
import IndexUsersService from '@modules/users/services/IndexUsersService';
import ResetPasswordService from '@modules/users/services/ResetPasswordService';
import SendForgotPasswordService from '@modules/users/services/SendForgotPasswordService';
import ShowUserService from '@modules/users/services/ShowUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import UpdateUserService from '@modules/users/services/UpdateUserService';

interface ICreateUserData {
  email?: string;
  password?: string;
  name?: string;
}

export const mockAuthenticateUserService = () => {
  const fakeUserRepository = new FakeUserRepository();
  const fakeHashProvider = new FakeHashProvider();
  const authenticateUserService = new AuthenticateUserService(fakeUserRepository, fakeHashProvider);
  return { authenticateUserService, fakeUserRepository };
};

export const mockCreateUserService = () => {
  const fakeUserRepository = new FakeUserRepository();
  const fakeHashProvider = new FakeHashProvider();
  const createUserService = new CreateUserService(fakeUserRepository, fakeHashProvider);
  return createUserService;
};

export const mockIndexUsersService = () => {
  const fakeUserRepository = new FakeUserRepository();
  const indexUsersService = new IndexUsersService(fakeUserRepository);
  return { indexUsersService, fakeUserRepository };
};

export const mockResetPasswordService = () => {
  const fakeUserRepository = new FakeUserRepository();
  const fakeUserTokenRepository = new FakeUserTokenRepository();
  const fakeHashProvider = new FakeHashProvider();
  const resetPasswordService = new ResetPasswordService(fakeUserRepository, fakeHashProvider, fakeUserTokenRepository);
  return { fakeUserRepository, fakeUserTokenRepository, fakeHashProvider, resetPasswordService };
};

export const mockSendForgotPasswordService = () => {
  const fakeUserRepository = new FakeUserRepository();
  const fakeUserTokenRepository = new FakeUserTokenRepository();
  const fakeMailProvider = new FakeMailProvider();
  const sendForgotPasswordService = new SendForgotPasswordService(fakeUserRepository, fakeMailProvider, fakeUserTokenRepository);
  return { fakeUserRepository, fakeUserTokenRepository, sendForgotPasswordService, fakeMailProvider };
};

export const mockShowUserService = () => {
  const fakeUserRepository = new FakeUserRepository();
  const showUserService = new ShowUserService(fakeUserRepository);
  return { showUserService, fakeUserRepository };
};

export const mockUpdateUserAvatarService = () => {
  const fakeUserRepository = new FakeUserRepository();
  const fakeStorageProvider = new FakeStorageProvider();
  const updateUserAvatarService = new UpdateUserAvatarService(fakeStorageProvider, fakeUserRepository);
  return { fakeUserRepository, fakeStorageProvider, updateUserAvatarService };
};

export const mockUpdateUserService = () => {
  const fakeUserRepository = new FakeUserRepository();
  const fakeHashProvider = new FakeHashProvider();
  const updateUserService = new UpdateUserService(fakeHashProvider, fakeUserRepository);
  return { fakeUserRepository, updateUserService, fakeHashProvider };
};

export const createUserData = ({ email, name, password }: ICreateUserData) => ({
  email: email || 'jj@email.com',
  password: password || '123456',
  name: name || 'username',
});
