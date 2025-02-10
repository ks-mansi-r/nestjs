import { Body, Controller, Delete, Get, Header, Ip, Param, ParseIntPipe, Post, Query, ValidationPipe, DefaultValuePipe, UseGuards, SetMetadata } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './providers/users.service';
import { GetUsersParamDto } from './dtos/get-users-param.dto';
import { ApiQuery, ApiTags, ApiOperation, ApiResponse} from '@nestjs/swagger';
import { CreateManyUsersDto } from './dtos/create-many-users.dto';
import { AccessTokenGuard } from 'src/auth/guards/access-token/access-token.guard';
import { Auth } from 'src/auth/decorator/auth.decorator';
// import { query, query } from 'express';
import { AuthType } from 'src/auth/enums/auth-type.enum';
@Controller('users')
@ApiTags('Users')
export class UsersController {

  constructor(
    private readonly userService: UsersService,
  ) { }


  @Get('/:id?')
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

  public getUsers(
    @Param() getUserParamDto: GetUsersParamDto,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return this.userService.findAll(getUserParamDto, limit, page);
  }

  @Post()
  // @SetMetadata('authType','None')
  @Auth(AuthType.None)
  public createUsers(@Body() createUserDto: CreateUserDto
  
    // @Ip() ip: any,
  ) {
    // console.log(createUserDto instanceof CreateUserDto);
    // console.log(ip);
    return this.userService.createUser(createUserDto);
  }

  @UseGuards(AccessTokenGuard)
  @Post('create-many')
  public createManyUsers(@Body() createManyUserDto: CreateManyUsersDto
  
    
  ) {
    
    return this.userService.createMany(createManyUserDto);
  }

}