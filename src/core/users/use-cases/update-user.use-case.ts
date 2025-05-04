import { UserRepositoryPort } from "../ports/user-repository.port";
import { User } from "../user";

export class UpdateUserUseCase {
    constructor(private readonly repo: UserRepositoryPort) { }

    async execute(id: number, username: string, password: string): Promise<void> {
        const user = new User(id, username, password);
        await this.repo.update(id, user);
    }
}
