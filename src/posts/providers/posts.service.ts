import { Body, Injectable } from "@nestjs/common";
import { UsersService } from "src/users/providers/users.service";
import { CreatePostDto } from "../dtos/create-post.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Post } from "../post.entity";
import { Repository } from "typeorm";
import { MetaOption } from "src/meta-options/meta-option.entity";
import { MetaOptionsService } from "src/meta-options/providers/meta-options.service";
import { TagsService } from "src/tags/providers/tags.service";
import { Tag } from "src/tags/tag.entity";
import { PatchPostsDto } from "../dtos/patch-post.dto";
@Injectable()
export class PostsService {
    constructor(
        // injecting users service

        private readonly usersService: UsersService,


        // inject postsrepository
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>,

        // inject metaOPtionRepository
        @InjectRepository(MetaOption)
        public readonly metaOptionsRepository: Repository<MetaOption>,
   

        //inject tagservice
   
      private readonly tagsService: TagsService,


    ) { }

    public async create(@Body()createPostDto: CreatePostDto) {
        // Create the metaOptions first if they exist
        let metaOptions = createPostDto.metaOptions ? this.metaOptionsRepository.create(createPostDto.metaOptions) : null;

        if (metaOptions) {
            await this.metaOptionsRepository.save(metaOptions);


            // find author from database based on authorId
        let author = await this.usersService.findOneById(createPostDto.authorId);

        // find tags
        let tags = await this.tagsService.findMultipleTags(createPostDto.tags);
        // Create the post
        
            // Create post
            let post = this.postRepository.create({
                ...createPostDto,
                author: author,
                tags: tags,
                // Ensure postType is a valid PostType object or its ID
            });
   
            // add metaOPtions to the Post
            // if (metaOptions) {
            //     post.metaOptions = metaOptions;
            // }

            // return the post
            return await this.postRepository.save(post);
        }
    }

    public async findAll(userId: String) {
        
// querying with eager loading
        // const user = this.usersService.findOneById(userId);
  
         let posts = await this.postRepository.find({
        //    add metaoptions for get a record
            relations:{
                metaOptions: true,
                author:true,
                tags: true,
            },
         });



         return posts;
        
        // return [{
        //     title: "Test 1",
        //     content: 'test content',
        // },
        // {

        //     title: "Test 2",
        //     content: 'test content 2',
        // },

        // ];
    }

    public async update(patchPostDto:PatchPostsDto){
        //find tags
        //find the post
        //update the properties
        //Assign the new tags
        //save the post and return

        let tags = await this.tagsService.findMultipleTags(patchPostDto.tags);

        let post = await this.postRepository.findOneBy({
            id: patchPostDto.id,
        })

        post.title = patchPostDto.title?? post.title;
        post.content = patchPostDto.content?? post.content;
        post.status = patchPostDto.status?? post.status;
        post.PostType= patchPostDto.postType?? post.PostType;
        post.slug = patchPostDto.slug?? post.slug;
        post.featuredImageUrl = patchPostDto.featuredImageUrl?? post.featuredImageUrl;
        post.publishOn = patchPostDto.publishOn?? post.publishOn;
    
        post.tags = tags;

        return await this.postRepository.save(post);
    
    }

    public async delete(id:number){
        //find the post 
        //deleting the post
        //delete meta options
        //confirmation

        // let post = await this.postRepository.findOneBy({id:id});

        // await this.postRepository.delete(id);

        // await this.metaOptionsRepository.delete(post.metaOptions.id);

        // return { deleted: true, id : post.id};

        let inversePost = await this.postRepository.findOne({
            where: { id },
            relations: { metaOptions: true }, // Ensure metaOptions is loaded
        });
          console.log(inversePost);

          return { deleted: true, id };
        

    }
}