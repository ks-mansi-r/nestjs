import { Injectable ,Inject} from '@nestjs/common';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Repository } from 'typeorm';
import { ObjectLiteral } from 'typeorm';
// import { Request } from '@nestjs/common';
import {REQUEST} from '@nestjs/core';
import { Request } from 'express';
import { Paginated } from '../interfaces/paginated.interface';
@Injectable()
export class PaginationProvider {

    constructor(

        //InjectING REQUEST
        @Inject(REQUEST)
        private readonly request: Request,
    ){}
    public async paginateQuery<T extends ObjectLiteral>(paginationQuery:PaginationQueryDto, repository:Repository<T>):Promise<Paginated<T>>{
        let results = await repository.find({
           
            
                skip:(paginationQuery.page-1)*paginationQuery.limit,
                take: paginationQuery.limit, 
             });


             //create the request URLS
             const baseURL = this.request.protocol + '://' + this.request.headers.host+'/';
             const newUrl = new URL(this.request.url, baseURL);
             console.log(newUrl);


            //calculating page number
            const totalItems = await repository.count();
            const totalPages = Math.ceil(totalItems/paginationQuery.limit);
            const nextPage = 
            paginationQuery.page == totalPages ?
             paginationQuery.page:paginationQuery.page + 1;


             const PreviousPage = 
             paginationQuery.page == totalPages ?
              paginationQuery.page:paginationQuery.page - 1;

              const finalResponse: Paginated<T> = {
                 data : results,
                 meta : {
                    itemsPerPage: paginationQuery.limit,
                    totalItems:totalItems,
                    currentPage: paginationQuery.page,
                    totalPages:totalPages,
                 },
                 links:{
                    first: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit}&page=1`,
                    last: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit}&page=${totalPages}`,
                    current: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit}&page=${paginationQuery.page}`,
                    next: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit}&page=${nextPage}`,
                    previous: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit}&page=${PreviousPage}`,
                
                }
              }
 
             return finalResponse;
    }
}
