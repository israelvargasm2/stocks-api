import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AuthenticationRepositoryPort } from '../ports/authentication-repository.port';
import { UserOrmEntity } from 'src/core/users/entities/user.orm-entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthenticationDatabaseRepositoryAdapter implements AuthenticationRepositoryPort {
    constructor(
        @InjectRepository(UserOrmEntity)
        private userRepository: Repository<UserOrmEntity>
    ) { }

    async findUser(username: string): Promise<UserOrmEntity | null> {
        return await this.userRepository.findOne({ where: { username } });
    }
}
