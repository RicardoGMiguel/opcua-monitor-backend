export default interface ICpfValidatorProvider {
  validateCPF(cpf: string): Promise<string>;
  validateCNPJ(cnpj: string): Promise<string>;
}
