import { Body, Controller, Delete, Get, Header, Ip, Param, ParseIntPipe, Post, Query, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './providers/users.service';
import { GetUsersParamDto } from './dtos/get-users-param.dto';
// import { query, query } from 'express';

@Controller('users')
export class UsersController {

  constructor(
    private readonly userService: UsersService,
  ) { }


  @Get('/:id?/:optional?/')
  public getUsers(@Param('id', ParseIntPipe) id: number | undefined,) {
    console.log(id);
    // console.log(typeof id);
    // // console.log(typeof page);
    // return 'You sent a get request to users endpoint';
    // return this.userService.findAll(GetUsersParamDto);
  }

  @Post()
  public createUsers(
    @Body() createUserDto: CreateUserDto
    // @Ip() ip: any,
  ) {
    console.log(createUserDto instanceof CreateUserDto);
    // console.log(ip);
    return 'send post request';
  }
}