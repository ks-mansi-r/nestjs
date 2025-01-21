import { Injectable, Module } from "@nestjs/common";
import { UsersController } from "../users.controller";
import { GetUsersParamDto } from "../dtos/get-users-param.dto";


@Module({
    controllers: [UsersController],
})
export class UsersService{

    public findAll(
        getUserParamDto: GetUsersParamDto
    ){
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

    // find by a id
    public findOneById(number){
        return {
            id:1234,
            firstName: "alice",
                email: "alice@gmail.com",
        }
    }
}