import { container } from 'tsyringe';

import MQTTProvider from './implementations/MQTTProvider';
import IMQTTProvider from './models/IMQTTProvider';

container.registerSingleton<IMQTTProvider>('MQTTProvider', MQTTProvider);
