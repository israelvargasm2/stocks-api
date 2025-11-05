import { UserEntity } from "../entities/user.entity";

export interface UsersPort {
    getAll(): Promise<UserEntity[]>;
    get(id: number): Promise<UserEntity | null>;
    getByEmail(email: string): Promise<UserEntity | null>;
    save(user: Partial<UserEntity>): Promise<UserEntity>;
    edit(id: number, user: UserEntity): Promise<void>;
    remove(id: number): Promise<void>;
}
