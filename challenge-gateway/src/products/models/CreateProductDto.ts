import { IsNotEmpty, MIN, Min } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  label: string;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  price: number;
  @Min(1)
  quantity: number;
  idSeller?: string;
  category: string;
  image? : string;
}
