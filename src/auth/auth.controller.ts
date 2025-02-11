import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { SignInDto } from './dto/signin.dto';
import { Auth } from './decorator/auth.decorator';
import { AuthType } from './enums/auth-type.enum';
import { RefreshTokenDto } from './dto/refresh-token.dto';
@Controller('auth')
export class AuthController {

    constructor(
    //  injecting auth service

    private readonly authService: AuthService,
    ){}

    @Post('sign-in')
    @HttpCode(HttpStatus.OK)
    @Auth(AuthType.None,AuthType.Bearer)
    public async signIn(@Body() signInDto :SignInDto){
 return this.authService.signIn(signInDto);
      

    }
    @Post('refresh-tokens')
    @HttpCode(HttpStatus.OK)
    @Auth(AuthType.None,AuthType.Bearer)
    public async refreshTokens(@Body() refreshTokenDto:RefreshTokenDto){
 return this.authService.refreshTokens(refreshTokenDto);
      

    }

    public isAuth(){
        return true;
    }
}
