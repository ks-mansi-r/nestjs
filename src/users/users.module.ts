import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './providers/users.service';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/providers/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersCreateManyProvider } from './providers/users-create-many.provider';
@Module({
    controllers: [UsersController],
    providers: [UsersService,AuthService, UsersCreateManyProvider],
    exports: [UsersService],
    // imports:[forwardRef(()=> AuthModule)],
    imports:[TypeOrmModule.forFeature([User])],
})
export class UsersModule { }