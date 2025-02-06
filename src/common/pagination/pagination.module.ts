import { Module } from '@nestjs/common';
import { PaginationOrovider } from './providers/pagination.porovider';
import { PaginationProvider } from './providers/pagination.provider';

@Module({
  providers: [PaginationOrovider, PaginationProvider]
})
export class PaginationModule {}
