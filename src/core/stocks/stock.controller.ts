import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CreateStockUseCase } from './use-cases/create-stock.use-case';
import { ListStocksStockUseCase } from './use-cases/list-stocks.use-case';
import { StockDatabaseRepositoryAdapter } from './adapters/stock-database-repository.adapter';
import { UpdateStockUseCase } from './use-cases/update-stock.use-case';
import { DeleteStockUseCase } from './use-cases/delete-stock.use-case';
import { GetStockUseCase } from './use-cases/get-stock.use-case';
import { AuthGuard } from '@nestjs/passport';

@Controller('stocks')
export class StockController {
    constructor(private readonly repoAdapter: StockDatabaseRepositoryAdapter) { }

    //@UseGuards(AuthGuard("jwt"))
    @Get()
    async getAll() {
        const useCase = new ListStocksStockUseCase(this.repoAdapter);
        return await useCase.execute();
    }

    @Get(":id")
    async get(@Param("id") id: number) {
        const useCase = new GetStockUseCase(this.repoAdapter);
        const stock = await useCase.execute(id);
        if (!stock) throw new NotFoundException();
        return stock;
    }

    @Post()
    async create(@Body("name") name: string, @Body("quantity") quantity: number, @Body("mount") mount: number) {
        const useCase = new CreateStockUseCase(this.repoAdapter);
        return await useCase.execute(name, quantity, mount);
    }

    @Put(":id")
    async update(@Param("id") id: number, @Body("name") name: string, @Body("quantity") quantity: number, @Body("mount") mount: number) {
        const useCase = new UpdateStockUseCase(this.repoAdapter);
        return await useCase.execute(id, name, quantity, mount);
    }

    @Delete(":id")
    async delete(@Param("id") id: number) {
        const useCase = new DeleteStockUseCase(this.repoAdapter);
        return await useCase.execute(id);
    }
}
