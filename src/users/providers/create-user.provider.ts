import { forwardRef, Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { RequestTimeoutException, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class CreateUserProvider {

    constructor(
      @InjectRepository(User)
        //inject usersrepository
        private readonly userRepository:Repository<User>,

        //inject hashingProvider
        @Inject(forwardRef(()=>HashingProvider))
        private readonly hashingProvider: HashingProvider,
    ){}
      public async createUser(createUserDto: CreateUserDto) {
             // check is user exists with same email
             let existingUser = undefined;
     
             try{
             
                 existingUser =await this.userRepository.findOne({
                 where: { email: createUserDto.email },
             });
         }
         catch(error){
              // MIght save the details of the exception
              // INformation which is sensitive
             throw new RequestTimeoutException(
                 'Unable to process your request at the moment please try later',
                 {
                     description:'Error connections to the database',
                 },
             );
         }
     
             // Handle exception
             if(existingUser ){
               throw new BadRequestException(
                 'The user already exsists, please check your email.'
               ) 
             }
             // create a new user 
             let newUser = this.userRepository.create({
                ...createUserDto,
                password: await this.hashingProvider.hashPassword(createUserDto.password),
      });
               
     
             try{
             newUser = await this.userRepository.save(newUser);
             }catch(error){
                 throw new RequestTimeoutException(
                     'Unable to process your request at the moment please try later',
                 
                 {
                     description:'Error connections to the database',
                 },
                 );
             }
             return newUser;
         }
     
}
