import { Inject, Injectable, Module, forwardRef } from "@nestjs/common";
import { UsersController } from "../users.controller";
import { GetUsersParamDto } from "../dtos/get-users-param.dto";
import { AuthService } from "src/auth/providers/auth.service";
/**
 * class to connect user table and perform business operations
 */


@Injectable()
export class UsersService{
    /**
     * The method to get all the users from the database
     */


    constructor(
    //    Injecting Auth service
    @Inject(forwardRef(()=> AuthService))
     private readonly authService: AuthService
    ){}
    public findAll(
        getUserParamDto: GetUsersParamDto
    ){

        const isAuth = this.authService.isAuth();
        console.log(isAuth);
        return[
            {
                firstName: "mansi",
                email : "mansi@gmail.com",

            },
            {
                firstName: "alice",
                email: "alice@gmail.com",
            },
        ];
    }
    /**
     * Find a single user string the ID of the user
     */

    // find by a id
    public findOneById(id: String){
        return {
            id:1234,
            firstName: "alice",
                email: "alice@gmail.com",
        };
    }
}