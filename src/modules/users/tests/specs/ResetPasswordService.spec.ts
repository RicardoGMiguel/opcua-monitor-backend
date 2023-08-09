// import AppError from '@shared/errors/AppError';
import AppError from '@shared/errors/AppError';
import { mockResetPasswordService, createUserData } from '../mocks';

describe('ResetForgotPassword', () => {
  it('shoud br able to reset password using email', async () => {
    const { fakeHashProvider, fakeUserRepository, fakeUserTokenRepository, resetPasswordService } = mockResetPasswordService();

    const user = await fakeUserRepository.create(createUserData({}));
    const { token } = await fakeUserTokenRepository.generate(user.id);

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    await resetPasswordService.execute({ password: '123123', token });
    const updatedUser = await fakeUserRepository.findById(user.id);

    expect(generateHash).toHaveBeenCalledWith('123123');
    expect(updatedUser?.password).toBe('123123');
  });

  it('shoud be able to reset password whit an non existing token', async () => {
    const { resetPasswordService } = mockResetPasswordService();

    await expect(resetPasswordService.execute({ token: 'unavaliable', password: '123456' })).rejects.toBeInstanceOf(AppError);
  });

  it('shoud be able to reset password whit an non existing user', async () => {
    const { fakeUserTokenRepository, resetPasswordService } = mockResetPasswordService();
    const { token } = await fakeUserTokenRepository.generate('unavaliable');
    await expect(resetPasswordService.execute({ token, password: '123456' })).rejects.toBeInstanceOf(AppError);
  });

  it('shoud be able to reset password after 2 hours', async () => {
    const { fakeUserRepository, fakeUserTokenRepository, resetPasswordService } = mockResetPasswordService();
    const user = await fakeUserRepository.create(createUserData({}));

    const { token } = await fakeUserTokenRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();
      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(resetPasswordService.execute({ token, password: '123456' })).rejects.toBeInstanceOf(AppError);
  });
});
