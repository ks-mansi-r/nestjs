import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { Post } from "src/posts/post.entity";
@Entity()
export class MetaOption{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'json',
        nullable: false,
    })
    metaValue: string;

    @CreateDateColumn()
    createDate: Date;

    @UpdateDateColumn()
    upadateDate: Date;


//  bi-directional relationship
    @OneToOne(()=> Post, ()=>(post)=> post.metaOption,{
        onDelete: 'CASCADE',
    })
    post: Post;


}