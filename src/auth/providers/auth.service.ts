import { Injectable, Inject,forwardRef } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { SignInProvider } from './sign-in.provider';
import { SignInDto } from '../dto/signin.dto';
import { RefreshTokenDto } from '../dto/refresh-token.dto';
import { RefreshTokensProvider } from './refresh-tokens.provider/refresh-tokens.provider';

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(()=>UsersService))
        private readonly userService: UsersService,


        ///inject signinprovider
        private readonly signInProvider: SignInProvider,

        //inject refreshtokenprovider
        private readonly refreshTokensProvider : RefreshTokensProvider,
    ){}


    public async signIn(signInDto: SignInDto){
        return await this. signInProvider.signIn(signInDto);
    }
    
public async refreshTokens(refreshTokenDto: RefreshTokenDto){
  return await this.refreshTokensProvider.refreshTokens(refreshTokenDto);
}



    public  isAuth(){
        return true;
    }
}
