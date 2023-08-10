import { container } from 'tsyringe';
import CreateMessageService from '@modules/messages/services/CreateMessageService';
import { IMessage } from '@modules/messages/dtos';

export default class ProductionMQTTController {
  public async create(data: IMessage): Promise<void> {
    const createMessageService = container.resolve(CreateMessageService);

    await createMessageService.execute(data);
  }
}
