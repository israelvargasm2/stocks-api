import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserOrmEntity } from '../entities/user-orm.entity';
import { UsersPort } from '../ports/users.port';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UsersPostgresAdapter implements UsersPort {
    constructor(
        @InjectRepository(UserOrmEntity)
        private usersRepository: Repository<UserOrmEntity>
    ) { }

    async getAll(): Promise<UserEntity[]> {
        return (await this.usersRepository.find()).map(item => new UserEntity(item.id, item.email, item.name, item.provider, item.picture));
    }

    async get(id: number): Promise<UserEntity | null> {
        try {
            let user: UserEntity | null = null;
            const userFound = await this.usersRepository.findOne({ where: { id } });
            if (userFound) {
                user = new UserEntity(userFound.id, userFound.email, userFound.name, userFound.provider, userFound.picture);
            }
            return user;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async getByEmail(email: string): Promise<UserEntity | null> {
        try {
            let user: UserEntity | null = null;
            const userFound = await this.usersRepository.findOne({ where: { email } });
            if (userFound) {
                user = new UserEntity(userFound.id, userFound.email, userFound.name, userFound.provider, userFound.picture);
            }
            return user;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async save(user: Partial<UserEntity>): Promise<UserEntity> {
        try {
            const userFound = await this.usersRepository.findOne({ where: { email: user.email } });
            if (userFound) {
                throw new Error("User already exists");
            }
            const userOrm = this.usersRepository.create(user);
            const userCreated = await this.usersRepository.save(userOrm);
            return new UserEntity(userCreated.id, userCreated.email, userCreated.name, userCreated.provider, userCreated.picture);
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async edit(id: number, user: UserEntity): Promise<void> {
        let userFound = await this.usersRepository.findOne({ where: { id } });
        if (!userFound) {
            throw new Error("User not found");
        }
        userFound = await this.usersRepository.findOne({ where: { email: user.email } });
        if (userFound) {
            throw new Error("User already exists");
        }
        try {
            const userOrm = this.usersRepository.create(user);
            await this.usersRepository.update(id, userOrm);
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async remove(id: number): Promise<void> {
        try {
            const user = await this.usersRepository.findOne({ where: { id } });
            if (!user) {
                throw new Error("User not found")
            }
            await this.usersRepository.delete(id);
        } catch (err) {
            throw new Error(err.message);
        }
    }
}
