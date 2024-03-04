import { Module } from '@nestjs/common';
import { PredictService } from './predict.service';
import { PredictController } from './predict.controller';
import { ModelService } from 'src/model/model.service';
import { PatientService } from 'src/patient/patient.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Patient, PatientSchema } from 'src/schema/patient.schema';

@Module({
    imports:[
        MongooseModule.forFeature([{ name: Patient.name, schema: PatientSchema }]),
    ],
    providers:[PredictService,ModelService,PatientService],
    controllers:[PredictController],
})
export class PredictModule {}
