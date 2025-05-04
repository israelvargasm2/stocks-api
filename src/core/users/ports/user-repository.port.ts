import { UserOrmEntity } from "../entities/user.orm-entity";
import { User } from "../user";

export interface UserRepositoryPort {
    findAll(): Promise<UserOrmEntity[]>
    find(id: number): Promise<UserOrmEntity | null>
    save(user: User): Promise<UserOrmEntity>;
    update(id: number, user: User): Promise<void>;
    delete(id: number): Promise<void>
}
