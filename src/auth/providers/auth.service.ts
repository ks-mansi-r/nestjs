import { Injectable, Inject,forwardRef } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(()=>UsersService))
        private readonly userService: UsersService,
    ){}

    public login(email : String, password:string, id:string){
        // const user = this.userService.findOneById('1234');

        // check user exists database
        // login

        // token
        return 'SAMPLE_TOKEN';
    }
    public  isAuth(){
        return true;
    }
}
