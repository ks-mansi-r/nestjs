import { Injectable } from '@nestjs/common';
import { CreatePostMetaOPtionsDto } from '../dtos/create-post-meta-options.dto';
import { Repository } from 'typeorm';
import { MetaOption } from '../meta-option.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MetaOptionsService {


    constructor(

        @InjectRepository(MetaOption)
        private readonly metaOptionsRepository:Repository<MetaOption>,
    ){}

    // create a new Meta option
    public async create(createPostMetaOptionDto: CreatePostMetaOPtionsDto){
          
            let metaOption = this.metaOptionsRepository.create(
                createPostMetaOptionDto,
            );
            return await this.metaOptionsRepository.save(metaOption);

            
        
    }
}
