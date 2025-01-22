import { IsArray, IsEnum, IsISO8601, IsJSON, IsNotEmpty, IsOptional, IsString, IsUrl, Matches, MinLength, ValidateNested } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { PostStatus } from '../enums/postStatus.enum';
import { postType } from '../enums/postType.enum';
import { CreatePostMetaOPtionsDto } from './create-post-meta-options.dto';


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
    @IsNotEmpty()
    title: string;
               
    @ApiProperty({
        enum:postType,
        description:"Possible values, 'post','page','story','series'",
    })
    @IsEnum(postType)
    @IsNotEmpty()
    postType: string;

    @ApiProperty({
        description:"For-example- my-url",
        example:'my-blog-post',
    })
    @IsString()
    @IsNotEmpty()
    @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
        message: 'A slug should be all small letters and uses only "-" and without spaces . For exxample "my-url"',
    
    })
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
        type:'array',
        required:false,
        items:
        {
            type:'object',properties:{
                key:{
                    type:'string',
                    description:"The key can be any string identifier for your meta option",
                },
                value:{
                    type:'any',
                    description:'the key can be any string identifier for your meta option',
                    example:'sidebarEnabled',
                }
            }
        }
    })
    @IsOptional()
    @IsArray()
    @ValidateNested({each : true})
    @Type(()=>CreatePostMetaOPtionsDto)
    metaOptions?: [{ key: 'sidebarEnabled'; value: false }];
}