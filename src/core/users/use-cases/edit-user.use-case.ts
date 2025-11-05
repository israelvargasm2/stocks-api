import { UserEntity } from "../entities/user.entity";
import { UsersPort } from "../ports/users.port";

export class EditUserUseCase {
    constructor(
        private readonly usersPort: UsersPort
    ) { }

    async execute(id: number, user: UserEntity): Promise<void> {
        return await this.usersPort.edit(id, user);
    }
}
