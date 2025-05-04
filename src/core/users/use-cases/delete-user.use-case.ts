import { UserRepositoryPort } from "../ports/user-repository.port";

export class DeleteUserUseCase {
    constructor(private readonly repo: UserRepositoryPort) { }

    async execute(id: number): Promise<void> {
        await this.repo.delete(id);
    }
}
