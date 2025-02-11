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
// import { RefresTokensProviderTs } from './providers/refresh-tokens.provider.ts/refresh-tokens.provider.ts';
import { RefreshTokensProvider } from './providers/refresh-tokens.provider/refresh-tokens.provider';
@Module({
  controllers: [AuthController],
  providers: [ 
    AuthService, 
    {

      //
    provide:HashingProvider, 


    // implements the actual logic using bcrypt.
    useClass:BcryptProvider


}, SignInProvider, GenerateTokensProvider, RefreshTokensProvider],
  imports: [forwardRef(()=>UsersModule),
    
   
    // JwtModule.registerAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => ({
    //     secret: configService.get<string>('JWT_SECRET'),
    //     signOptions: {
    //       expiresIn: `${configService.get<string>('JWT_ACCESS_TOKEN_TTL')}s`,
    //       audience: configService.get<string>('JWT_TOKEN_AUDIENCE')?.toString() || 'localhost:3000',
    //       issuer: configService.get<string>('JWT_TOKEN_ISSUER') || 'localhost:3000',
       
        
    //     },
    //   }),
    // }),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  
  exports: [AuthService,HashingProvider, SignInProvider, GenerateTokensProvider, RefreshTokensProvider],
})
export class AuthModule {}
