import { UsersPort } from "../ports/users.port";

export class RemoveUserUseCase {
    constructor(
        private readonly usersPort: UsersPort
    ) { }

    async execute(id: number): Promise<void> {
        return await this.usersPort.remove(id);
    }
}
