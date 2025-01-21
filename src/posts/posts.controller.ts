import { Controller , Get, Param} from "@nestjs/common";
import { PostsService } from './providers/posts.service';

@Controller('posts')
export class PostsController {
    constructor(
        /*
        Injecting posts service
        */
        private readonly postsService: PostsService,
    ) { }

    @Get()
    public getPosts(@Param('userId')  userId: String){
        return this.postsService.findAll(userId);
    }

}