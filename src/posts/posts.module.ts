import { Module} from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './providers/posts.service';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { MetaOptionsModule } from 'src/meta-options/meta-options.module';
import { TagsModule } from 'src/tags/tags.module';
import { User } from 'src/users/user.entity';
import { PaginationModule } from 'src/common/pagination/pagination.module';
@Module({
    controllers : [ PostsController],
    providers: [PostsService],
    imports:[UsersModule,PaginationModule ,TypeOrmModule.forFeature([Post,MetaOption])
,MetaOptionsModule,TagsModule
],
})
export class PostsModule {}
