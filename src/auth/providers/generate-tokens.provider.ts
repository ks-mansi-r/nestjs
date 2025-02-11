import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { User } from 'src/users/user.entity';
import { ActiveUserData } from '../interfaces/active-user-data.interface';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class GenerateTokensProvider {
    

    constructor(

        //inject jwtservice
        private readonly jwtservice:JwtService,


        private readonly configService: ConfigService,
        //inject jwtconfiguration
        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    ){}
    

    public async signToken<T>(userId: number, expiresIn: number, payload?: T) {
        return await this.jwtservice.signAsync(
          {
            sub: userId,
            ...payload,
          },
          {
            // audience: this.jwtConfiguration.audience,
            // issuer: this.jwtConfiguration.issuer,
            // secret: this.jwtConfiguration.secret,
            // expiresIn,
            audience: this.configService.get<string>('JWT_TOKEN_AUDIENCE'),
            issuer: this.configService.get<string>('JWT_TOKEN_ISSUER'),
            secret: this.configService.get<string>('JWT_SECRET'),
            expiresIn,
          },
        );
      }
    
      public async generateTokens(user: User) {
        const [accessToken, refreshToken] = await Promise.all([
          // Generate Access Token with Email
          this.signToken<Partial<ActiveUserData>>(
            user.id,
            this.jwtConfiguration.accessTokenTtl,
            { email: user.email },
          ),
    
          // Generate Refresh token without email
          this.signToken(user.id, this.jwtConfiguration.refreshTokenTtl),
        ]);
        
        console.log('Generated Access Token:', accessToken);
    console.log('Generated Refresh Token:', refreshToken);

        return {
          accessToken,
          refreshToken,
        };
      }}