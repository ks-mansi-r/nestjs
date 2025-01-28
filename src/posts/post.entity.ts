import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { postType } from "./enums/postType.enum";
import { PostStatus } from "./enums/postStatus.enum";
import { CreatePostMetaOPtionsDto } from "./dtos/create-post-meta-options.dto";

@Entity()
export class Post{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({
        type:'varchar',
        length:512,
        nullable:false,
    })
  title: string;

  @Column({
    type:'enum',
    enum:postType,
    nullable:false,
    default:postType.POST,
  })
  postType:postType;

  @Column({
    type:'varchar',
    length:256,
    nullable:false,
  })
  slug:string;

  @Column({
    type:'enum',
    enum:postType,
    nullable:false,
    default:PostStatus.DRAFT,
  })
  status:PostStatus;

  @Column({
    type:'text',
    nullable:true,
  })
  content?:string;

  @Column({
    type:'text',
    nullable:true,
  })
  schema?:string;

  @Column({
    type:'varchar',
    length:1024,
    nullable:true,

  })
  featuredImageUrl?: string;

  @Column({
    type:'timestamp',  
    // datetime in mytsql
    nullable:true,

  })
  publishOn?: Date;

//   work on these in lectures on relationships
  tags?: ['typescript', 'nestjs'];
  metaOptions?:CreatePostMetaOPtionsDto[];
}