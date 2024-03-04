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
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
    AuthModule,
    PredictModule,
    UsersModule,
    MongooseModule.forRoot('mongodb://localhost:27017/pi'),
  ],
  controllers: [AppController, PredictController],
  providers: [AppService, PredictService, ModelService],
})
export class AppModule {}
