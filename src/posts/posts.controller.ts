import { Body, Post,Patch, Controller, Get, Param } from "@nestjs/common";
import { PostsService } from './providers/posts.service';
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreatePostDto } from "./dtos/create-post.dto";
import { PatchPostsDto } from "./dtos/patch-post.dto";

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
    public getPosts(@Param('userId') userId: String) {
        return this.postsService.findAll(userId);
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
       console.log(createPostDto);
    }

    @Patch()
    public updatePost(@Body() patchPostsDto:PatchPostsDto){
        console.log(patchPostsDto);

    }
}