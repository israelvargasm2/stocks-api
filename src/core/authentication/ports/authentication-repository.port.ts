import { UserOrmEntity } from "src/core/users/entities/user.orm-entity";

export interface AuthenticationRepositoryPort {
    findUser(username: string): Promise<UserOrmEntity | null>
}
