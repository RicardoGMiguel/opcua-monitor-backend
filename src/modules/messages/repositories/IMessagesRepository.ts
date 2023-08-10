import Message from '@modules/messages/infra/typeorm/entities/Message';
import ICreateMessageDTO from '@modules/messages/dtos/ICreateMessageDTO';

export default interface IMessageRepository {
  findAllMessages(): Promise<Message[] | undefined>;
  create(data: ICreateMessageDTO): Promise<Message>;
  save(message: Message): Promise<Message>;
  delete(message: Message): Promise<void>;
}
