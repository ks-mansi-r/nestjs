import { Module, forwardRef } from '@nestjs/common';

import { AuthController } from './auth.controller';

import { AuthService } from './providers/auth.service';
import { UsersModule } from 'src/users/users.module';
import { HashingProvider } from './providers/hashing.provider';
import { BcryptProvider } from './providers/bcrypt.provider';
import { SignInProvider } from './providers/sign-in.provider';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { GenerateTokensProvider } from './providers/generate-tokens.provider';
@Module({
  controllers: [AuthController],
  providers: [ 
    AuthService, 
    {

      //
    provide:HashingProvider, 


    // implements the actual logic using bcrypt.
    useClass:BcryptProvider


}, SignInProvider, GenerateTokensProvider],
  imports: [forwardRef(()=>UsersModule),
    
    // JwtModule.register({
    //   secret: process.env.JWT_SECRET || '348b6179e0f63c48557fc185451767c3116a533b95070b97550408ef70644c06', // Ensure a valid secret key
    //   signOptions: { expiresIn: '1h' ,
        
    //   },
    // }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get<string>('JWT_ACCESS_TOKEN_TTL')}s`,
          audience: configService.get<string>('JWT_TOKEN_AUDIENCE')?.toString() || 'localhost:3000',
          issuer: configService.get<string>('JWT_TOKEN_ISSUER') || 'localhost:3000',
        },
      }),
    }),
    ConfigModule.forFeature(jwtConfig),
    // JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  
  exports: [AuthService,HashingProvider, SignInProvider],
})
export class AuthModule {}
