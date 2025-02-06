import { ConflictException, Injectable, RequestTimeoutException } from '@nestjs/common';
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
                    // Creates a new user entity
                    let newUser = queryRunner.manager.create(User, user);
                   //Saves the user into the database.
                    let result = await queryRunner.manager.save(newUser);
                    // Stores the successfully created user in newUsers array.
                    newUsers.push(result);
                }
    
          
    
            //If successfull commit 
            await queryRunner.commitTransaction();
        } catch(error){
    
            //If unsuccessfull rollback
    
            await queryRunner.rollbackTransaction();
            throw new ConflictException('could not complete transction',{
                description: String(error),
            });
        } finally{
            //Release  connection
            try{
                await queryRunner.release();

            } catch(error){
                throw new RequestTimeoutException(
                    'Could not release the query runner connection',
                  );
            }
        
        }
        

        return {users:newUsers};
    }
}
