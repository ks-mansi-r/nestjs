import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import jwtConfig from 'src/auth/config/jwt.config';
import { Request } from 'express';
import { REQUEST_USER_KEY } from 'src/auth/constants/auth.constants';
@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    //inject jwtSErvice

    private readonly jwtService: JwtService,

    //inject jwtConfiguration
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

  ){}
  async canActivate(
    context: ExecutionContext,
  ):  Promise<boolean>  {

    //EXtract the request from the execution context
    const request = context.switchToHttp().getRequest();
    //Extract the token from header

    const token = this.extractRequestFromHeader(request);
    //validate the token

    //verify the token is authorized or not
    if(!token){
      throw new UnauthorizedException(); 
    }
    try{
      const payload  = await this.jwtService.verifyAsync(
        token,
        this.jwtConfiguration,
      );

      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request[REQUEST_USER_KEY] = payload;
      console.log(payload);
      
    } catch(error){
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractRequestFromHeader(request:Request):string | undefined{
    const [_, token]= request.headers.authorization?.split(' ') ?? [];
    return token;

  }
}
