import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepositoryPort } from '../ports/user-repository.port';
import { UserOrmEntity } from '../entities/user.orm-entity';
import { User } from '../user';
import {hash, hashSync} from 'bcrypt';

@Injectable()
export class UserDatabaseRepositoryAdapter implements UserRepositoryPort {
    constructor(
        @InjectRepository(UserOrmEntity)
        private userRepository: Repository<UserOrmEntity>
    ) { }

    async findAll(): Promise<UserOrmEntity[]> {
        return (await this.userRepository.find()).sort((a, b) => a.username.localeCompare(b.username, "es", { sensitivity: "base" }));
    }

    async find(id: number): Promise<UserOrmEntity | null> {
        return await this.userRepository.findOne({ where: { id } });
    }

    async save(user: User): Promise<UserOrmEntity> {
        const userOrmEntity = new UserOrmEntity();
        userOrmEntity.username = user.username;
        userOrmEntity.password = hashSync(user.password, 10);
        return await this.userRepository.save(userOrmEntity);
    }

    async update(id: number, user: User): Promise<void> {
        const userOrmEntity = new UserOrmEntity();
        userOrmEntity.username = user.username;
        userOrmEntity.password = user.password;
        await this.userRepository.update(id, userOrmEntity);
    }

    async delete(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }
}
