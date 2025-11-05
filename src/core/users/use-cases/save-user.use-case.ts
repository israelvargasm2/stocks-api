import { UserEntity } from "../entities/user.entity";
import { UsersPort } from "../ports/users.port";

export class SaveUserUseCase {
    constructor(
        private readonly usersPort: UsersPort
    ) { }

    async execute(user: Partial<UserEntity>): Promise<UserEntity> {
        return await this.usersPort.save(user);
    }
}
