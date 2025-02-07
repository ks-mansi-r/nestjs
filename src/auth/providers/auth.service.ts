import { Injectable, Inject,forwardRef } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { SignInProvider } from './sign-in.provider';
import { SignInDto } from '../dto/signin.dto';

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(()=>UsersService))
        private readonly userService: UsersService,


        ///inject signinprovider
        private readonly signInProvider: SignInProvider,
    ){}


    public async signIn(signInDto: SignInDto){
        return await this. signInProvider.signIn(signInDto);
    }
    

    public  isAuth(){
        return true;
    }
}
