import { Body, Post, Controller, Get, Param } from "@nestjs/common";
import { PostsService } from './providers/posts.service';
import { ApiTags } from "@nestjs/swagger";
import { CreatePostDto } from "./dtos/create-post.dto";

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



    @Post()
    public createPost(@Body() createPostDto: CreatePostDto) {
       console.log(createPostDto);
    }
}