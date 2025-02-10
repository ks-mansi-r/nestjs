import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { SignInDto } from './dto/signin.dto';
import { Auth } from './decorator/auth.decorator';
import { AuthType } from './enums/auth-type.enum';
@Controller('auth')
export class AuthController {

    constructor(
    //  injecting auth service

    private readonly authService: AuthService,
    ){}

    @Post('sign-in')
    @HttpCode(HttpStatus.OK)
    @Auth(AuthType.None)
    public async signIn(@Body() signInDto :SignInDto){
 return this.authService.signIn(signInDto);
      

    }

    public isAuth(){
        return true;
    }
}
