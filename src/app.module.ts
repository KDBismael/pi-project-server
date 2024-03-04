import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PredictService } from './predict/predict.service';
import { PredictController } from './predict/predict.controller';
import { PredictModule } from './predict/predict.module';
import { ModelService } from './model/model.service';
import { PatientService } from './patient/patient.service';
import { Patient, PatientSchema } from './schema/patient.schema';


@Module({
  imports: [
    AuthModule,
    PredictModule,
    UsersModule,
    MongooseModule.forRoot('mongodb://localhost:27017/pi'),
    MongooseModule.forFeature([{ name: Patient.name, schema: PatientSchema }]),
  ],
  controllers: [AppController, PredictController],
  providers: [AppService, PredictService, ModelService, PatientService],
})
export class AppModule {}
