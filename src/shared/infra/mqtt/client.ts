import { container } from 'tsyringe';

import MQTTProvider from '@shared/container/providers/MQTTProvider/implementations/MQTTProvider';
import MessageMQTTController from '@modules/messages/infra/mqtt/controllers/MessageMQTTController';

const mqttController = new MessageMQTTController();

export default async (): Promise<void> => {
  const mqttProvider = container.resolve(MQTTProvider);

  await mqttProvider.connect({
    onConnected: () => {
      mqttProvider.subscribe('testOPC');
      console.log('connect');
    },
  });

  mqttProvider.onMessage = (topic, message) => {
    if (topic === 'testOPC') {
      mqttController.create(message).catch(error => console.log(error));
    }
  };
};
