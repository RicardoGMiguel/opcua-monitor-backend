/* eslint-disable prettier/prettier */
import { injectable, inject } from 'tsyringe';

import Message from '@modules/messages/infra/typeorm/entities/Message';

import IMessagesRepository from '@modules/messages/repositories/IMessagesRepository';

@injectable()
class IndexMessagesService {
  constructor(
    @inject('MessagesRepository')
    private messagesRepository: IMessagesRepository,
  ) { }

  public async execute(): Promise<Message[] | undefined> {
    const messages = await this.messagesRepository.findAllMessages();

    return messages;
  }
}

export default IndexMessagesService;
