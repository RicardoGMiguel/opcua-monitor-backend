/* eslint-disable prettier/prettier */
import { injectable, inject } from 'tsyringe';

import Message from '@modules/messages/infra/typeorm/entities/Message';

import IMessagesRepository from '@modules/messages/repositories/IMessagesRepository';

interface ICreateMessageServiceRequest {
  value: string;
}

@injectable()
class CreateMessageService {
  constructor(
    @inject('MessagesRepository')
    private messageRepository: IMessagesRepository,
  ) { }

  public async execute({ value }: ICreateMessageServiceRequest): Promise<Message> {
    const message = await this.messageRepository.create({
      value,
    });

    return message;
  }
}

export default CreateMessageService;
