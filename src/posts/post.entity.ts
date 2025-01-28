import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { postType } from "./enums/postType.enum";
import { PostStatus } from "./enums/postStatus.enum";
import { CreatePostMetaOPtionsDto } from "../meta-options/dtos/create-post-meta-options.dto";
import { MetaOption } from "src/meta-options/meta-option.entity";

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
    nullable:false,
    enum: ['post','page','story','series'], // Add all expected values here
    default: 'post',
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
    enum:['draft','scheduled','review','published'],
    nullable:false,
    default:'draft'
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

  @OneToOne(()=>MetaOption)
  @JoinColumn()
  metaOptions?: MetaOption;
//   work on these in lectures on relationships
  tags?: ['typescript', 'nestjs'];
  
}