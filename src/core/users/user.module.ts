import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserDatabaseRepositoryAdapter } from './adapters/user-database-repository.adapter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrmEntity } from './entities/user.orm-entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserOrmEntity])],
  providers: [UserDatabaseRepositoryAdapter],
  controllers: [UserController]
})
export class UserModule { }
