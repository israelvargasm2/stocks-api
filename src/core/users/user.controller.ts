import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { UserDatabaseRepositoryAdapter } from './adapters/user-database-repository.adapter';
import { ListUsersStockUseCase } from './use-cases/list-users.use-case';
import { GetUserUseCase } from './use-cases/get-user.use-case';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { UpdateUserUseCase } from './use-cases/update-user.use-case';
import { DeleteUserUseCase } from './use-cases/delete-user.use-case';

@Controller('users')
export class UserController {
    constructor(private readonly repoAdapter: UserDatabaseRepositoryAdapter) { }

    @Get()
    async getAll() {
        const useCase = new ListUsersStockUseCase(this.repoAdapter);
        return await useCase.execute();
    }

    @Get(":id")
    async get(@Param("id") id: number) {
        const useCase = new GetUserUseCase(this.repoAdapter);
        const user = await useCase.execute(id);
        if (!user) throw new NotFoundException();
        return user;
    }

    @Post()
    async create(@Body("username") username: string, @Body("password") password: string) {
        const useCase = new CreateUserUseCase(this.repoAdapter);
        return await useCase.execute(username, password);
    }

    @Put(":id")
    async update(@Param("id") id: number, @Body("username") username: string, @Body("password") password: string) {
        const useCase = new UpdateUserUseCase(this.repoAdapter);
        return await useCase.execute(id, username, password);
    }

    @Delete(":id")
    async delete(@Param("id") id: number) {
        const useCase = new DeleteUserUseCase(this.repoAdapter);
        return await useCase.execute(id);
    }
}
