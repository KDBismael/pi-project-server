import { Module,forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { User, UserSchema } from 'src/schema/user.schema';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { Patient, PatientSchema } from 'src/schema/patient.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Patient.name, schema: PatientSchema }]),
    forwardRef(() => AuthModule),
  ],
  providers: [UsersService, AuthService],
  exports:[UsersService]
})
export class UsersModule {}
