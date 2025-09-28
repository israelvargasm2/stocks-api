import { UserEntity } from "../entities/user.entity";
import { UsersPort } from "../ports/users.port";

export class GetUsersUseCase {
    constructor(
        private readonly usersPort: UsersPort
    ) { }

    async execute(): Promise<UserEntity[]> {
        return await this.usersPort.getAll();
    }
}
