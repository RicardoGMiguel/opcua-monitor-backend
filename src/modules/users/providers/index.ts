import { container } from 'tsyringe';

import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import BcriptHashProvider from '@modules/users/providers/HashProvider/implementations/BcriptHashProvider';

import IDocumentValidatorProvider from '@modules/users/providers/DocumentValidatorProvider/models/IDocumentValidatorProvider';
import DocumentValidatorProvider from '@modules/users/providers/DocumentValidatorProvider/implementations/DocumentValidatorProvider';

container.registerSingleton<IHashProvider>('HashProvider', BcriptHashProvider);
container.registerSingleton<IDocumentValidatorProvider>('DocumentValidatorProvider', DocumentValidatorProvider);
