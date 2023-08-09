import Category from '@modules/categories/infra/typeorm/entities/Category';

export default interface ICreateBuffetDTO {
  name: string;
  user_id: string;
  description: string;
  cnpj: string;
  cellphone: string;
  categories: Category[];
}
