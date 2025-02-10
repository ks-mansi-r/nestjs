import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AccessTokenGuard } from '../access-token/access-token.guard';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import { REPLCommand } from 'repl';
import { Console } from 'console';
import { AUTH_TYPE_KEY } from 'src/auth/constants/auth.constants';
@Injectable()
export class AuthenticationGuard implements CanActivate {

  //set the default Auth TYpe
  private static readonly defaultAuthType = AuthType.Bearer;
  

  //create  authTypeGuardMap
  private readonly authTypeGuardMap: Record<
    
  AuthType,
  CanActivate | CanActivate[]
  > = {
    [AuthType.Bearer]: this.accessTokenGuard,
    //route points are accessible return true
    [AuthType.None]: { canActivate: ()=> true },
  };
  constructor(
    private readonly reflector : Reflector,
    private readonly accessTokenGuard: AccessTokenGuard,
  ){}


  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean>  {

    // Print authTypeGuardMap
    //authTypes from reflector
    const authTypes= this.reflector.getAllAndOverride<AuthType[]>(
      AUTH_TYPE_KEY,
      [context.getHandler(),
        context.getClass()]
    ) ?? [AuthenticationGuard.defaultAuthType];

     // Show what are authTypes
    console.log(authTypes);
    
     //array of guards
      // printeGuards => Show that the user can pass an array in users controller as well
    const guards = authTypes.map((type)=>this.authTypeGuardMap[type]).flat();

    //prints all guards
    console.log(guards);

    //default error
    const error = new UnauthorizedException()

    
    //Loop guards canActivate
    for (const instance of guards){

      // Decalre a new constant
      const canActivate = await Promise.resolve(
        // Here the AccessToken Guard Will be fired and check if user has permissions to acces
        // Later Multiple AuthTypes can be used even if one of them returns true
        // The user is Authorised to access the resource
      instance.canActivate(context),
      ).catch(err=>{
        error: error;
      });

      //display can activate
      console.log(canActivate);
      if(canActivate){
        return true;
      }
    }
    throw error;
  }
}
