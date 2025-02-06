import { Body, Post,Patch, Controller, Get, Param, Query, ParseIntPipe, Delete } from "@nestjs/common";
import { PostsService } from './providers/posts.service';
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreatePostDto } from "./dtos/create-post.dto";
import { PatchPostsDto } from "./dtos/patch-post.dto";
import { GetPostsDto } from "./dtos/get-posts.dto";

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
    public createPost(@Body() createPostDto: CreatePostDto) {
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