import { UserEntity } from "../entities/user.entity";
import { UsersPort } from "../ports/users.port";

export class GetUserUseCase {
    constructor(
        private readonly usersPort: UsersPort
    ) { }

    async execute(id: number): Promise<UserEntity | null> {
        return await this.usersPort.get(id);
    }
}
