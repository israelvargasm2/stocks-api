import { UserOrmEntity } from "../entities/user.orm-entity";
import { UserRepositoryPort } from "../ports/user-repository.port";
import { User } from "../user";

export class CreateUserUseCase {
    constructor(private readonly repo: UserRepositoryPort) { }

    async execute(username: string, password: string): Promise<UserOrmEntity> {
        const user = new User(Date.now(), username, password);
        return await this.repo.save(user);
    }
}
