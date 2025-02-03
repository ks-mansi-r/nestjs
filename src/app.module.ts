import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
/* User created modules*/
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Tag } from './tags/tag.entity';
import { TagsModule } from './tags/tags.module';
import { MetaOptionsModule } from './meta-options/meta-options.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
require('dotenv').config()

console.log(process.env.DATABASE_USER)
// Get the current NODE_ENV
const ENV = process.env.NODE_ENV;

@Module({
  imports: [UsersModule, PostsModule, AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,  
      // envFilePath:['.env.development','.env'],
      // envFilePath: !ENV ? '.env' : `.env.${ENV}`,
      envFilePath: '.env'
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        // console.log("DATABASE_USER:", configService.get('DATABASE_USER'));
        // console.log("DATABASE_PASSWORD:", configService.get<string>('DATABASE_PASSWORD'));
        // console.log("DATABASE_HOST:", configService.get('DATABASE_HOST'));
        // console.log("DATABASE_PORT:", configService.get('DATABASE_PORT'));
        // console.log("DATABASE_NAME:", configService.get('DATABASE_NAME'));
    
        return {
          type: 'postgres',
          port: +configService.get('DATABASE_PORT'),
          username: process.env.DATABASE_USER,
          password: configService.get<string>('DATABASE_PASSWORD') || 'password',

          host: configService.get('DATABASE_HOST'),
          database: configService.get('DATABASE_NAME'),
    
          autoLoadEntities: true,
          synchronize: true,
        };
      },
    }),
    
    TagsModule,
    MetaOptionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { 
  
}
