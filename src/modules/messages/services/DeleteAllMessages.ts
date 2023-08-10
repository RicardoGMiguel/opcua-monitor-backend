/* eslint-disable prettier/prettier */
import { injectable, inject } from 'tsyringe';

import IMessagesRepository from '@modules/messages/repositories/IMessagesRepository';

@injectable()
export default class DeleteAllMessagesService {
  constructor(
    @inject('MessagesRepository')
    private messageRepository: IMessagesRepository,
  ) { }

  public async execute(): Promise<void> {
    const messages = await this.messageRepository.findAllMessages();

    messages?.forEach(message => this.messageRepository.delete(message));
  }
}
