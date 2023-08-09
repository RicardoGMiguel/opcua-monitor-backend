import AppError from '@shared/errors/AppError';
import { mockSendForgotPasswordService, createUserData } from '../mocks';

describe('SendForgotPassword', () => {
  it('shoud br able to recover password using email', async () => {
    const { fakeUserRepository, fakeMailProvider, sendForgotPasswordService } = mockSendForgotPasswordService();
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUserRepository.create(createUserData({}));

    await sendForgotPasswordService.execute({ email: 'jj@email.com' });

    expect(sendMail).toHaveBeenCalled();
  });

  it('shoud not be able to recover a invalid password', async () => {
    const { sendForgotPasswordService } = mockSendForgotPasswordService();
    await expect(sendForgotPasswordService.execute({ email: 'jj@email.com' })).rejects.toBeInstanceOf(AppError);
  });

  it('shoud generate a forgot password token', async () => {
    const { fakeUserRepository, fakeUserTokenRepository, sendForgotPasswordService } = mockSendForgotPasswordService();
    const generateToken = jest.spyOn(fakeUserTokenRepository, 'generate');

    const user = await fakeUserRepository.create(createUserData({}));

    await sendForgotPasswordService.execute({ email: 'jj@email.com' });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
