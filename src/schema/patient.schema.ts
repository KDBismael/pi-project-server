import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })

export class Patient {
  @Prop()
  firstName: string;
  @Prop()
  lastName: string;
  @Prop()
  birthDate: string;
  @Prop({ type: Buffer, required: true })
  image: Buffer;
  @Prop({required:false,default:null})
  label: number;
}

export type PatientDocument = Patient & Document;
export const PatientSchema = SchemaFactory.createForClass(Patient);