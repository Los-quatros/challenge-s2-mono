import { PartialType } from '@nestjs/mapped-types';
import { NewSellerDto } from './newSeller.dto';

export class UpdateSellerDto extends PartialType(NewSellerDto) {}