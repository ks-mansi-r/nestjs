import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { SignInDto } from './dto/signin.dto';

@Controller('auth')
export class AuthController {

    constructor(
    //  injecting auth service

    private readonly authService: AuthService,
    ){}

    @Post('sign-in')
    public async signIn(@Body() signInDto :SignInDto){

        //Find  the user using emailId
        //Throw an eception user not found
        //compare the password to user hash
        //send confirmation
        

    }

    public isAuth(){
        return true;
    }
}
