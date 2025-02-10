import { Body, Post,Patch, Controller, Get,Req, Param, Query, ParseIntPipe, Delete } from "@nestjs/common";
import { PostsService } from './providers/posts.service';
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreatePostDto } from "./dtos/create-post.dto";
import { PatchPostsDto } from "./dtos/patch-post.dto";
import { GetPostsDto } from "./dtos/get-posts.dto";
import { request } from "http";
import { REQUEST } from "@nestjs/core";
import { REQUEST_USER_KEY } from "src/auth/constants/auth.constants";
import { ActiveUser } from "src/auth/decorator/active-user.decorator";
import { ActiveUserData } from "src/auth/interfaces/active-user-data.interface";

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
    constructor(
        /*
        Injecting posts service
        */
        private readonly postsService: PostsService,
    ) { }



    @Get('/:userId?')
    public getPosts(
        @Param('userId') userId: string, 
        @Query()postQuery: GetPostsDto) {
            console.log(postQuery);
        return this.postsService.findAll(postQuery,userId);
    }


    @ApiOperation({
        summary:'Creates a new blog post',
    })
 @ApiResponse({
    status:201,
    description:"you get a 201 response if your post is created successfully ",
 })

    @Post()
    public createPost(
        // @Req() request
        @Body() createPostDto: CreatePostDto,
        @ActiveUser() user : ActiveUserData,
    ) {
    // return this.postsService.create(createPostDto);
    // console.log(request[REQUEST_USER_KEY]);
    console.log(user);
    return this.postsService.create(createPostDto);
    }


    @ApiOperation({
        summary:' updates an existing blog post',
    })
    @ApiResponse({
        status: 200,
        description:'A 200 response if the post is updatated successfully',
    })
    @Patch()
    public updatePost(@Body() patchPostDto:PatchPostsDto){
        return this.postsService.update(patchPostDto);

    }
     @Delete()
    public deletePost(@Query('id')id:number){
     return this.postsService.delete(id);
    }
}