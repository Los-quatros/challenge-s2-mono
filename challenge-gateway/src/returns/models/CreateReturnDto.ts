import { ArrayMinSize, IsDefined } from 'class-validator';
export class CreateOrderProductForReturnDto {
  @IsDefined()
  id_product: string;

  @IsDefined()
  nbItemReturned: number;
}

export class CreateReturnDto {
  @ArrayMinSize(1)
  orderProducts: Array<CreateOrderProductForReturnDto>;
  reason: string;
  total: number;
}
