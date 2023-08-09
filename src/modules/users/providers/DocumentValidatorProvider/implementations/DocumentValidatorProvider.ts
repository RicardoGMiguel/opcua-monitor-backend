import IDocumentValidatorProvider from '@modules/users/providers/DocumentValidatorProvider/models/IDocumentValidatorProvider';
import { cpf, cnpj } from 'cpf-cnpj-validator';

import AppError from '@shared/errors/AppError';

export default class DocumentValidatorProvider implements IDocumentValidatorProvider {
  public async validateCPF(userCPF: string): Promise<string> {
    const normalizedCPF = userCPF.replace(/[-./]/g, '');

    const validateCPF = cpf.isValid(normalizedCPF);

    if (!validateCPF) {
      throw new AppError('The CPF must be a valid number!');
    }

    return normalizedCPF;
  }

  public async validateCNPJ(userCNPJ: string): Promise<string> {
    const normalizedCNPJ = userCNPJ.replace(/[-./]/g, '');

    const validateCNPJ = cnpj.isValid(normalizedCNPJ);

    if (!validateCNPJ) {
      throw new AppError('The CNPJ must be a valid number!');
    }

    return normalizedCNPJ;
  }
}
