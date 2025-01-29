import { IsJSON, isJSON, IsNotEmpty, IsString } from "class-validator";

export class CreatePostMetaOPtionsDto{


    // @IsNotEmpty()
     @IsJSON()
    metaValue:string;
    

//     {
//         "metaValue":"{\"sidebarEnabled\":true, \"footerActive\":true}"
//     // }
}