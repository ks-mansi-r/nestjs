import { IsJSON, isJSON, IsNotEmpty, IsString } from "class-validator";

export class CreatePostMetaOPtionsDto{


    @IsNotEmpty()
     @IsJSON()
    metaValue:string;
    // @IsString()
    // @IsNotEmpty()
    // key: string;

    // @IsNotEmpty()
    // value : any;
}