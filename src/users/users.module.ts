import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './providers/users.service';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/providers/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersCreateManyProvider } from './providers/users-create-many.provider';
import { CreateUserProvider } from './providers/create-user.provider';
// import { HashingProvider } from 'src/auth/providers/hashing.provider';

@Module({
    controllers: [UsersController],
    providers: [UsersService,AuthService, UsersCreateManyProvider, CreateUserProvider],
    exports: [UsersService],
    // imports:[forwardRef(()=> AuthModule)],
    imports:[TypeOrmModule.forFeature([User]),
           forwardRef(()=> AuthModule)],
})
export class UsersModule { }