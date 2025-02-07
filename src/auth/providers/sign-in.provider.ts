import { forwardRef, Injectable, Inject, RequestTimeoutException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { SignInDto } from '../dto/signin.dto';
import { HashingProvider } from './hashing.provider';
@Injectable()
export class SignInProvider {


    constructor(
       //inject userSErvice

       @Inject(forwardRef(()=> UsersService))
       private readonly usersService: UsersService,


       /// inject hashingprovider
       private readonly hashingProvider : HashingProvider,
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

         //send confirmation

         return true;
    }
}
