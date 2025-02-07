import { Injectable } from '@nestjs/common';
import { HashingProvider } from './hashing.provider';
import * as bcrypt from 'bcrypt';
@Injectable()
export class BcryptProvider implements HashingProvider{

   public async  hashPassword(data:string|Buffer):Promise<string>{

        //Generate salt 
        const salt = await bcrypt.genSalt();
        return bcrypt.hash(data, salt);
        // throw new Error('Method not implemenred');
    }

   comparePassword(
        data:string|Buffer,
        encrypted:string,
    ):Promise<boolean>{
        return bcrypt.compare(data,encrypted);
    }
}
