import { MqttClient, connect } from 'mqtt';

import IMQTTProvider from '@shared/container/providers/MQTTProvider/models/IMQTTProvider';
import { IMessage } from '@modules/messages/dtos';
import { IConnectDTO } from '../dtos/IConnectDTO';

class MQTTProvider implements IMQTTProvider {
  public client: MqttClient;

  public onMessage: (topic: string, message: any) => void;

  public connect({ onConnected }: IConnectDTO): void {
    if (this.client) throw new Error('MQTT already connected');

    const url = process.env.MQTT_URL;

    if (!url) {
      console.log('MQTT not configured.');
      return;
    }

    this.client = connect(url);

    this.client.on('connect', () => {
      console.log('✔✔ Connected to MQTT');
      onConnected();
    });

    this.client.on('message', (topic, message) => {
      // console.log(topic, message);
      const jsonMessage = { value: message.toString() } as IMessage;

      if (this.onMessage) {
        this.onMessage(topic, jsonMessage);
      }
    });
  }

  public async subscribe(topic: string): Promise<void> {
    if (!this.client) throw new Error('No MQTT client connected');

    this.client.subscribe(topic, () => {
      console.log(`Subscribed to topic: "${topic}"`);
    });
  }
}

export default MQTTProvider;
