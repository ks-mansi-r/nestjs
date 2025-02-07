import { BadRequestException, HttpException, HttpStatus, Inject, Injectable, Module, RequestTimeoutException, forwardRef } from "@nestjs/common";
import { UsersController } from "../users.controller";
import { GetUsersParamDto } from "../dtos/get-users-param.dto";
import { AuthService } from "src/auth/providers/auth.service";
import { User } from "../user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository , DataSource} from "typeorm";
import { CreateUserDto } from "../dtos/create-user.dto";
import { UsersCreateManyProvider } from "./users-create-many.provider";
import { CreateManyUsersDto } from "../dtos/create-many-users.dto";
import { CreateUserProvider } from "./create-user.provider";
import { FindOneUserByEmailProvider } from "./find-one-user-by-email.provider";
// import { ConfigService } from "@nestjs/config";

/**
 * class to connect user table and perform business operations
 */


@Injectable()
export class UsersService {
    /**
     * The method to get all the users from the database
     */


    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,

        // Injecting ConfigService
        // private readonly configService: ConfigService,

        //    Injecting Auth service
        // @Inject(forwardRef(()=> AuthService))
        //  private readonly authService: AuthService


        // //Inject datasource
        // private readonly dataSource:DataSource,

        //inject usersCReateManyprovider
        private readonly usersCreateManyProvider : UsersCreateManyProvider,


        //inject createuserprovider
        private readonly createUserProvider: CreateUserProvider,
  
  // inject findOneBYEmailprovider
  private readonly findOneUserByEmailProvider: FindOneUserByEmailProvider,


    ) { }


    // creating a new user
    public async createUser(createUserDto: CreateUserDto) {
        // check is user exists with same email
      return this.createUserProvider.createUser(createUserDto);
    }





    public findAll(
        getUserParamDto: GetUsersParamDto,
        limit: number,
        page: number,
    ) {
        throw new HttpException({
            status:HttpStatus.MOVED_PERMANENTLY,
            error:'The API endpoint does not exist',
            fileName:'users.service.ts',
            lineNumber:88
        },   
         HttpStatus.MOVED_PERMANENTLY,
         {
            cause: new Error(),
            description:'Occured because the API endpoint was permanently moved',
         }
)

        // const environment = this.configService.get<string>('S3_BUCKET');
        // console.log(environment);

        // const isAuth = this.authService.isAuth();
        // console.log(isAuth);
        // return [
        //     {
        //         firstName: "mansi",
        //         email: "mansi@gmail.com",

        //     },
        //     {
        //         firstName: "alice",
        //         email: "alice@gmail.com",
        //     },
        // ];
    }
    /**
     * Find a single user string the ID of the user
     */

    // find by a id
    public async findOneById(id: number) {
        let user = undefined;
        try{
            user = await this.userRepository.findOneBy({
                id,
            })
        } catch(error){
            throw new RequestTimeoutException(
                'Unable to process your request at the moment please try later',
            
            {
                description:'Error connections to the database',
            },
            );
        }

    //Handle the user does not exist
    if(!user){
        throw new BadRequestException('The user id does not exist');
    }

        return  user;
    }


    public async createMany(createManyUserDto:CreateManyUsersDto)
    {
        return await this.usersCreateManyProvider.createMany(createManyUserDto);
    }

    public async findOneByEmail(email:string){

        return await this.findOneUserByEmailProvider.findOneByEmail(email);
    }
}