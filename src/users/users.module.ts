import { Module,forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { User, UserSchema } from 'src/schema/user-schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  import:[
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    forwardRef(() => AuthModule),
  ],
  providers: [UsersService]
})
export class UsersModule {}
