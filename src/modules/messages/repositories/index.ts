import { container } from 'tsyringe';

import IMessagesRepository from '@modules/messages/repositories/IMessagesRepository';
import MessagesRepository from '@modules/messages/infra/typeorm/repositories/MessagesRepository';

container.registerSingleton<IMessagesRepository>('MessagesRepository', MessagesRepository);
