import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateMessageService from '@modules/messages/services/CreateMessageService';
import IndexMessagesService from '@modules/messages/services/IndexMessagesService';
import DeleteAllMessagesService from '@modules/messages/services/DeleteAllMessages';

export default class MessagesController {
  public async index(req: Request, res: Response): Promise<Response> {
    const indexMessagesService = container.resolve(IndexMessagesService);

    const messages = await indexMessagesService.execute();

    return res.json(classToClass(messages));
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { value } = req.body;

    const createMessageService = container.resolve(CreateMessageService);

    const message = await createMessageService.execute({
      value,
    });

    return res.json(classToClass(message));
  }

  public async clearAll(req: Request, res: Response): Promise<Response> {
    const deleteAllMessagesService = container.resolve(DeleteAllMessagesService);

    await deleteAllMessagesService.execute();

    return res.sendStatus(204);
  }
}
