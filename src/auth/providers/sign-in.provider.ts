import { forwardRef, Injectable, Inject, RequestTimeoutException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { SignInDto } from '../dto/signin.dto';
import { HashingProvider } from './hashing.provider';
import jwtConfig from '../config/jwt.config';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import { ActiveUserData } from '../interfaces/active-user-data.interface';
import { GenerateTokensProvider } from './generate-tokens.provider';
@Injectable()
export class SignInProvider {


    constructor(
       //inject userSErvice

       @Inject(forwardRef(()=> UsersService))
       private readonly usersService: UsersService,


       /// inject hashingprovider
       private readonly hashingProvider : HashingProvider,

       //inject jwtservice
    //    private readonly jwtService: JwtService,

    //    //inject jwtConfiguration

    //    @Inject(jwtConfig.KEY)
    //    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,


       //inject generatetoken provider
       private readonly generateTokensProvider: GenerateTokensProvider,
       
    ){}
    public async signIn(signInDto:SignInDto){
        //find the user using email ID
        //throw an exception user not found
        let user= await this. usersService.findOneByEmail(signInDto.email);


        //compare password to the hash
        let isEqual : boolean = false;
      

        try{
            isEqual = await this.hashingProvider.comparePassword(
                signInDto.password,
                user.password,
        
            )
        }catch(error){
       

        throw new RequestTimeoutException(error, {
            description:'could not compare passwords'
        });
        }

        if(!isEqual){
         throw new UnauthorizedException('Incorrect password');
        }
        
//         console.log('JWT Secret:', this.jwtConfiguration.secret);
//    console.log('JWT audience:',this.jwtConfiguration.audience );
     
//         //generate access token 
//          const accessToken = await this.jwtService.signAsync({
  
//             sub: user.id,
//             email:user.email,
//          }as ActiveUserData,
//         {
//             audience : this.jwtConfiguration.audience,
//             issuer: this.jwtConfiguration.issuer,
//             secret: this.jwtConfiguration.secret,
//             expiresIn: this.jwtConfiguration.accessTokenTtl,

//         }
//     ,);


//         //return access token
//      return {
//         accessToken,
//      };

//generate access token 
return await this.generateTokensProvider.generateTokens(user);
    }
}
