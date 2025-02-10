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
import { FindOneUserByEmailProvider } from './providers/find-one-user-by-email.provider';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from 'src/auth/config/jwt.config';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from 'src/auth/guards/access-token/access-token.guard';

@Module({
    controllers: [UsersController],
    providers: [UsersService,AuthService, UsersCreateManyProvider, CreateUserProvider, FindOneUserByEmailProvider,
        {provide: APP_GUARD, 
            useClass:AccessTokenGuard,}],
            
    exports: [UsersService],
    // imports:[forwardRef(()=> AuthModule)],
    imports:[TypeOrmModule.forFeature([User]),
           forwardRef(()=> AuthModule),
         ConfigModule.forFeature(jwtConfig),
            JwtModule.registerAsync(jwtConfig.asProvider())],
})
export class UsersModule { }