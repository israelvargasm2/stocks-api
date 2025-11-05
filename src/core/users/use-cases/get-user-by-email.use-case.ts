import { UserEntity } from "../entities/user.entity";
import { UsersPort } from "../ports/users.port";

export class GetUserByEmailUseCase {
    constructor(
        private readonly usersPort: UsersPort
    ) { }

    async execute(email: string): Promise<UserEntity | null> {
        return await this.usersPort.getByEmail(email);
    }
}
