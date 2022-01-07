export class CreatePortalDto {}

export class AdsDto {
  id: string | 'N/A';
  link?: string | 'N/A';
  title: string | 'N/A';
  image?: string | 'N/A';
  price: string | 'N/A';
  engine?: string;
  registrationDate: string | 'N/A';
  productionDate?: string | 'N/A';
  milage: string | 'N/A';
  power: string | 'N/A';
}
