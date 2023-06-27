import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type SellerDocument = Seller & Document;

@Schema()
export class Seller {

    @Prop({ default: uuidv4 })
    id: string;

    @Prop()
    name: string;

    @Prop()
    isActive: boolean;

    @Prop()
    description: string;

    @Prop()
    userId: string;

    @Prop()
    products?: Array<string>;

}

export const SellerSchema = SchemaFactory.createForClass(Seller);
