import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import jwtConfig from 'src/auth/config/jwt.config';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenDto } from 'src/auth/dto/refresh-token.dto';
import { GenerateTokensProvider } from '../generate-tokens.provider';
import { UsersService } from 'src/users/providers/users.service';
import { forwardRef } from '@nestjs/common';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
@Injectable()
export class RefreshTokensProvider {

    constructor(
        private readonly jwtService: JwtService,

        //inject jwtconfiguration

        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    
    // inject generateTokenProvider

    private readonly generateTokensProvider: GenerateTokensProvider,

    //inject userSErvice
    
           @Inject(forwardRef(()=> UsersService))
           private readonly usersService: UsersService,
    
    
    ){

    }

    public async refreshTokens(refreshTokenDto: RefreshTokenDto){

try{
        //verify the refresh token using jwtSErvice
        const { sub } = await this.jwtService.verifyAsync<Pick<ActiveUserData,'sub'>>(refreshTokenDto.refreshToken,{

 
            secret:this.jwtConfiguration.secret,
            audience:this.jwtConfiguration.audience,
            issuer:this.jwtConfiguration.issuer,
           
        },);

        //fetch user from the database
        const user = await this.usersService.findOneById(sub);

        if (!user) {
            throw new UnauthorizedException('User not found');
          }
        //generate the tokens

        return await this.generateTokensProvider.generateTokens(user);
    }
    catch(error){
        throw new   UnauthorizedException(error);
    }
}
}
