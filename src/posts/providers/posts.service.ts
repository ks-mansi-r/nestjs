import { Injectable } from "@nestjs/common";
import { UsersService } from "src/users/providers/users.service";

@Injectable()
export class PostsService{
    constructer(
        // injecting users service

        // private readonly usersService: UsersService,
    ){}
    public findAll(userId : String){
        // console.log(userId);

        // const user = this.usersService.findOneById(userId);


        return[{
            title : "Test 1",
            content : 'test content',
        },
        {

            title : "Test 2",
            content : 'test content 2',
        },
    
    ]
    }
}