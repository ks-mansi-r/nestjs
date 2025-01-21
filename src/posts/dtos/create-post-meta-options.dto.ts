import { IsNotEmpty, IsString } from "class-validator";

export class CreatePostMetaOPtionsDto{
    @IsString()
    @IsNotEmpty()
    key: string;

    @IsNotEmpty()
    value : any;
}