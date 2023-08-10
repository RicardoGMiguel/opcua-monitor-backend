import { getRepository, Repository } from 'typeorm';

import IMessageRepository from '@modules/messages/repositories/IMessagesRepository';
import ICreateMessageDTO from '@modules/messages/dtos/ICreateMessageDTO';

import Message from '@modules/messages/infra/typeorm/entities/Message';

class MessageRepository implements IMessageRepository {
  private ormRepository: Repository<Message>;

  constructor() {
    this.ormRepository = getRepository(Message);
  }

  public async findAllMessages(): Promise<Message[]> {
    const messages = await this.ormRepository.find();

    return messages;
  }

  public async create({ value }: ICreateMessageDTO): Promise<Message> {
    const message = this.ormRepository.create({ value });
    await this.ormRepository.save(message);

    return message;
  }

  public async save(message: Message): Promise<Message> {
    return this.ormRepository.save(message);
  }

  public async delete(message: Message): Promise<void> {
    await this.ormRepository.remove(message);
  }
}

export default MessageRepository;
