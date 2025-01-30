import { Body, Controller, Delete, Post , Query} from '@nestjs/common';
import { CreateTagDto } from './dtos/create-tag.dto';
import { TagsService } from './providers/tags.service';

@Controller('tags')
export class TagsController {

    constructor(

        // Inject tagservice
        private readonly tagsService: TagsService,
    ){}
    @Post()

    public create(@Body() createTagDto: CreateTagDto){
        return this.tagsService.create(createTagDto);

    }
    @Delete()
    public async delete(@Query('id')id:number){
        return this.tagsService.delete(id);

    }
    // rags/soft-delete
    @Delete('soft-delete')
    public async softdelete(@Query('id')id:number){
        return this.tagsService.softRemove(id);

    }
}