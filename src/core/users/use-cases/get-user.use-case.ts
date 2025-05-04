import { UserOrmEntity } from "../entities/user.orm-entity";
import { UserRepositoryPort } from "../ports/user-repository.port";

export class GetUserUseCase {
    constructor(private readonly repo: UserRepositoryPort) { }

    async execute(id: number): Promise<UserOrmEntity | null> {
        return await this.repo.find(id);
    }
}
