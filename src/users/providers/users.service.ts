import { Inject, Injectable, Module, forwardRef } from "@nestjs/common";
import { UsersController } from "../users.controller";
import { GetUsersParamDto } from "../dtos/get-users-param.dto";
import { AuthService } from "src/auth/providers/auth.service";
import { User } from "../user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "../dtos/create-user.dto";
/**
 * class to connect user table and perform business operations
 */


@Injectable()
export class UsersService{
    /**
     * The method to get all the users from the database
     */
   

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        
    
    
        //    Injecting Auth service
    // @Inject(forwardRef(()=> AuthService))
    //  private readonly authService: AuthService
    ){}


    // creating a new user
    public async createUser(createUserDto: CreateUserDto){
        // check is user exists with same email
           const existingUser = await this.userRepository.findOne({
             where:  { email: createUserDto.email },
           });
        // Handle exception
        // create a new user 
        let newUser = this.userRepository.create(createUserDto);
        newUser = await this.userRepository.save(newUser);

        return newUser;
    }




    
    public findAll(
        getUserParamDto: GetUsersParamDto
    ){

        // const isAuth = this.authService.isAuth();
        // console.log(isAuth);
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
    public  async findOneById(id: number){
        return await this.userRepository.findOneBy({
            id,

        })
        
}
}