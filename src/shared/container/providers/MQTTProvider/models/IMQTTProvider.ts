import { MqttClient } from 'mqtt';
import { IConnectDTO } from '../dtos/IConnectDTO';

export default interface IMQTTProvider {
  client: MqttClient;
  onMessage: (topic: string, message: any) => void;

  connect(params: IConnectDTO): void;
  subscribe(topic: string): Promise<void>;
}
