import { IsArray, IsEnum, IsISO8601, IsJSON, IsNotEmpty, IsOptional, IsString, IsUrl, Matches, MinLength, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { PostStatus } from '../enums/postStatus.enum';
import { postType } from '../enums/postType.enum';
import { CreatePostMetaOPtionsDto } from './create-post-meta-options.dto';

export class CreatePostDto {
    @IsString()
    @MinLength(4)
    @IsNotEmpty()
    title: string;


    @IsEnum(postType)
    @IsNotEmpty()
    postType: string;


    @IsString()
    @IsNotEmpty()
    @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
        message: 'A slug should be all small letters and uses only "-" and without spaces . For exxample "my-url"',
    })
    slug: string;

    @IsEnum(PostStatus)
    @IsNotEmpty()
    status: PostStatus;

    @IsString()
    // @IsJSON()
    content: string;

    @IsOptional()
    @IsJSON()
    schema?: string;

    @IsOptional()
    @IsUrl()
    featuredImageUrl?: string;

    @IsISO8601()
    @IsOptional()
    publishOn?: Date;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    @MinLength(3, { each: true })
    tags?: ['typescript', 'nestjs'];

    @IsOptional()
    @IsArray()
    @ValidateNested({each : true})
    @Type(()=>CreatePostMetaOPtionsDto)
    metaOptions: [{ key: 'sidebarEnabled'; value: false }];
}