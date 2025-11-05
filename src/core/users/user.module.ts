import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrmEntity } from './entities/user-orm.entity';
import { UsersPostgresAdapter } from './adapters/users-postgres.adapter';

@Module({
  imports: [TypeOrmModule.forFeature([UserOrmEntity])],
  providers: [UsersPostgresAdapter],
  controllers: []
})
export class UserModule { }
