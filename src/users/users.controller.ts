import { Body, Controller, Delete, Get, Header, Ip, Param, ParseIntPipe, Post, Query, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './providers/users.service';
import { GetUsersParamDto } from './dtos/get-users-param.dto';
import { ApiQuery, ApiTags, ApiOperation, ApiResponse} from '@nestjs/swagger';
// import { query, query } from 'express';

@Controller('users')
@ApiTags('Users')
export class UsersController {

  constructor(
    private readonly userService: UsersService,
  ) { }


  @Get('/:id/:optional?/')
  @ApiOperation({
    summary: 'Fetches a list of entries returned per query',
  })
  @ApiResponse({
    status:200,
    description:"Users fetched successfully based on the query"
  })
  @ApiQuery({
    name:'limit',
    type:'number',
    required:false,
    description: 'The number of entries returned per query',
    example: 10,
  })
  @ApiQuery({
    name:'page',
    type:'number',
    required:false,
    description:'The position of the page number that you want the API to return ',
    example: 1,
  })

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