import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PostType } from "./enums/postType.enum";// Assuming enum is correctly imported
import { PostStatus } from "./enums/postStatus.enum"; 
import { MetaOption } from "src/meta-options/meta-option.entity";
import { User } from "src/users/user.entity";
import { Tag } from "src/tags/tag.entity";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 512,
        nullable: false,
    })
    title: string;

    @Column({
        type: 'enum',
        nullable: false,
        enum: ['post', 'page', 'story', 'series'], // Enum for post types
        default: 'post',
    })
    PostType: PostType;

    @Column({
        type: 'varchar',
        length: 256,
        nullable: false,
    })
    slug: string;

    @Column({
        type: 'enum',
        enum: ['draft', 'scheduled', 'review', 'published'],
        nullable: false,
        default: 'draft',
    })
    status: PostStatus;

    @Column({
        type: 'text',
        nullable: true,
    })
    content?: string;

    @Column({
        type: 'text',
        nullable: true,
    })
    schema?: string;

    @Column({
        type: 'varchar',
        length: 1024,
        nullable: true,
    })
    featuredImageUrl?: string;

    @Column({
        type: 'timestamp',
        nullable: true,
    })
    publishOn?: Date;


    
    @OneToOne(() => MetaOption,(metaOptions)=>metaOptions.post,{
      cascade: true, 
      eager: true,
    })
    @JoinColumn()
    metaOptions?: MetaOption;

    @ManyToOne(()=>User, (user)=> user.posts)
    author:User; 



    // @Column("simple-array", { nullable: true })  // Ensure that this field is properly handled
    
    @ManyToMany(()=>Tag,{
        // load all data into tag
        eager:true,
    })
    @JoinTable()
    tags?: Tag[];  // This will store an array of strings like ['typescript', 'nestjs']
}
