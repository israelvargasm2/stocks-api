import { UserOrmEntity } from "../entities/user.orm-entity";
import { UserRepositoryPort } from "../ports/user-repository.port";

export class ListUsersStockUseCase {
    constructor(private readonly repo: UserRepositoryPort) { }

    async execute(): Promise<UserOrmEntity[]> {
        return await this.repo.findAll();
    }
}
