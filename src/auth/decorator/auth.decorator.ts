import { SetMetadata } from '@nestjs/common';
import { AuthType } from '../enums/auth-type.enum';
// import { AUTH_TYPE_KEY } from '../constants/auth.constants';


export const AUTH_TYPE_KEY = 'authType';
export const Auth = (...authTypes: AuthType[]) => SetMetadata('authType', authTypes);
