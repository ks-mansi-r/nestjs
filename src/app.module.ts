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
import { ConfigModule } from '@nestjs/config';
import { PaginationModule } from './common/pagination/pagination.module';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import enviromentValidation from './config/enviroment.validation';
import jwtConfig from './auth/config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from './auth/guards/access-token/access-token.guard';
// Get the current NODE_ENV
const ENV = process.env.NODE_ENV;

console.log(process.env.DATABASE_HOST)

@Module({
  imports: [UsersModule, PostsModule, AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
      load: [jwtConfig],
      // validationSchema: enviromentValidation,
      // envFilePath:['.env.development','.env'],
      // envFilePath: !ENV ? '.env' : `.env.${ENV}`,
      // envFilePath: '.env'
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: 5432,
      username: 'user',
      password: 'password',

      host: 'localhost',
      database: 'nestjs-blog',

      autoLoadEntities: true,
      synchronize: true,
    }),
    TagsModule,
    MetaOptionsModule,
    PaginationModule,
      ConfigModule.forFeature(jwtConfig),
      JwtModule.registerAsync(jwtConfig.asProvider())
  ],
  controllers: [AppController],
  providers: [AppService,
     {provide: APP_GUARD, 
                useClass:AccessTokenGuard,}
  ],
})
export class AppModule {

}
