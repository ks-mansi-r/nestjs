import { Body, Controller, Post } from '@nestjs/common';
import { CreatePostMetaOPtionsDto } from './dtos/create-post-meta-options.dto';
import { MetaOptionsService } from './providers/meta-options.service';

@Controller('meta-options')
export class MetaOptionsController {


    constructor(

        private readonly metaOptionService : MetaOptionsService,
    ){}
    @Post()
    public async create(@Body() createPostMetaOPtionsDto: CreatePostMetaOPtionsDto){

    return this.metaOptionService.create(createPostMetaOPtionsDto);

}
}
