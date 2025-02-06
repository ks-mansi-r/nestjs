import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { DataSource } from 'typeorm';
import { User } from '../user.entity';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';

@Injectable()
export class UsersCreateManyProvider {
constructor(
    //Inject datasource
            private readonly dataSource:DataSource,
        ) { }

     public async createMany(createManyUserDto:CreateManyUsersDto)
        {
            //declare new user with emty arry
            let newUsers: User[]=[];
    
            //Create Query Runner Instance
            const queryRunner = this.dataSource.createQueryRunner();
    
    
            //Connect Query Runner to datasource
            await queryRunner.connect();
    
            //start Transcation
            await queryRunner.startTransaction();
            try{
                for(let user of createManyUserDto.users){
                    let newUser = queryRunner.manager.create(User, user);
                    let result = await queryRunner.manager.save(newUser);
                    newUsers.push(result);
                }
    
          
    
            //If successfull commit 
            await queryRunner.commitTransaction();
        } catch(error){
    
            //If unsuccessfull rollback
    
            await queryRunner.rollbackTransaction();
        } finally{
            //Release  connection
    
            await queryRunner.release();
        }
        

        return newUsers;
    }
}
