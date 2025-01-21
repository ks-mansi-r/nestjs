import { IsArray, IsEnum, IsISO8601, IsJSON, IsNotEmpty, IsOptional, IsString, IsUrl, Matches, MinLength } from 'class-validator';
import { PostStatus } from '../enums/postStatus.enum';
import { postType } from '../enums/postType.enum';

export class CreatePostDto {
    @IsString()
    @MinLength(4)
    @IsNotEmpty()
    title: string;


    @IsEnum(postType)
    @IsNotEmpty()
    postType: string;

    slug: string;


    @IsString()
    @IsNotEmpty()
    @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
        message: 'A slug sgould be all small letters and uses only "-" and without spaces . For exxample "my-url"',
    })

    @IsEnum(PostStatus)
    @IsNotEmpty()
    status: PostStatus;

    @IsString()
    @IsJSON()
    content?: string;

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
    metaOptions: [{ key: 'sidebarEnabled'; value: false }];
}