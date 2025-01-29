import { IsArray, IsEnum, IsInt, IsISO8601, IsJSON, IsNotEmpty, IsOptional, IsString, IsUrl, Matches, MaxLength, MinLength, ValidateNested } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { PostStatus } from '../enums/postStatus.enum';
import { PostType } from '../enums/postType.enum';
import { CreatePostMetaOPtionsDto } from '../../meta-options/dtos/create-post-meta-options.dto';


// {
//     "title" : "What's new with NestJs !",
//     "postType": "page",
//     "slug":"new-with-nestjs",
//     "status":"draft",
//     "content":"test content",
//     "schema":"{\r\n\"@context\":\"https:\/\/schema.org\",\r\n\"@type\":\"person\"\r\n}",
//     "featuredImageUrl":"http://localhost.com/images/image1.ipg",
//     "publishOn":"2024-03-16T07:46:32+0000",
//     "tags":["nestjs","typescript"],
//     "metaOptions":[
//         {
//             "key":"testKey",
//             "value":20
//         }
//     ]
// // }
export class CreatePostDto {
    @ApiProperty({
        example:"This is a title",
        description:"This is the title for the blog post",
    })
    @IsString()
    @MinLength(4)
    @MaxLength(512)
    @IsNotEmpty()
    title: string;
               
    @ApiProperty({
        enum:PostType,
        description:"Possible values, 'post','page','story','series'",
    })
    @IsEnum(PostType)
    @IsNotEmpty()
    postType: string;

    @ApiProperty({
        description:"For-example- my-url",
        example:'my-blog-post',
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
        message: 'A slug should be all small letters and uses only "-" and without spaces . For exxample "my-url"',
    
    })
    @MaxLength(256)
    slug: string;


    @ApiProperty({
        enum:PostStatus,
        description:"Possible  values 'draft','scheduled','reveiew','published'",
    })
    @IsEnum(PostStatus)
    @IsNotEmpty()
    status: PostStatus;
   
    @ApiPropertyOptional({
        description:"This is content of the post",
        example:"THe post Content",
    })
    @IsString()
    // @IsJSON()
    content: string;


    @ApiPropertyOptional({
        description:"Serialize your JSON object else a validation error will be thrown.",
    })
    @IsOptional()
    @IsJSON()
    schema?: string;
    
    @ApiPropertyOptional({
        description:"Featured image for your blog post ",
        example:"http://localhost.com/images/image1.ipg",
    })
    @IsOptional()
    @IsUrl()
    @MinLength(4)
    @MaxLength(1024)
    featuredImageUrl?: string;


    @ApiPropertyOptional({
        description:"The date on which the blog is published",
        example:"2024-03-16T07:46:32+0000",
    })
    @IsISO8601()
    @IsOptional()
    publishOn?: Date;


    @ApiPropertyOptional({
        description:"Array of thags passed as string values",
        example:["nestjs","typescript"],
    })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    @MinLength(3, { each: true })
    tags?: ['typescript', 'nestjs'];


    @ApiPropertyOptional({
        type:'object',
        required:false,
        items:
        {
            type:'object',properties:{
               metaValue:{
                    type:'json',
                    description:"The metaValue is a JSON string",
                    example: '{"sidebarEnabled":true}',
                },
            
            },
        },
    })
    @IsOptional()
    @ValidateNested({each : true})
    @Type(()=>CreatePostMetaOPtionsDto)

    // whenever user send a request where meta options are not available so let's expect a null value as well for these
    metaOptions?: CreatePostMetaOPtionsDto|null;


    @ApiProperty({
        type: 'integer',
        required: true,
        example: 1,
    })
    @IsNotEmpty()
    @IsInt()
    authorId : number;


    // {
    //     "title" : "What's new with NestJs !",
    //    "postType": "page",
    //    "slug":"new-with-nestjs",
    //    "status":"draft",
    //   "content":"test content",
    //    "schema":"{\r\n\"@context\":\"https:\/\/schema.org\",\r\n\"@type\":\"person\"\r\n}",
    //     "featuredImageUrl":"http://localhost.com/images/image1.ipg",
    //    "publishOn":"2024-03-16T07:46:32+0000",
    //     "metaOptions":
    //     { 
    //          "metaValue":  "{\"sidebarEnabled\":true, \"footerActive\":true}"
    //     }
    //     }

}