import { Injectable, RequestTimeoutException, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FindOneUserByEmailProvider {

    constructor(

        //inject userrepository
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ){}
    public async findOneByEmail(email:string){

        let user : User|undefined = undefined;

        try{
    user = await this. usersRepository.findOneBy({
        email:email,
    });
        }catch(error){
            throw new RequestTimeoutException(error, {
                description: 'could not fetch the user',
            });
        }
            if(!user){

            throw new UnauthorizedException('user does not exist');

        }
        return user;
    }
    
}
