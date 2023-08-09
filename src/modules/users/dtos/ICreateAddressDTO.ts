export default interface ICreateAddressDTO {
  uf: string;
  cep: string;
  city: string;
  number: number;
  street: string;
  complement?: string;
  neighborhood: string;
  latitude: number;
  longitude: number;
}
