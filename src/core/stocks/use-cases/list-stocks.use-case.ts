import { StockOrmEntity } from "../entities/stock.orm-entity";
import { StockRepositoryPort } from "../ports/stock-repository.port";

export class ListStocksStockUseCase {
    constructor(private readonly repo: StockRepositoryPort) { }

    async execute(): Promise<StockOrmEntity[]> {
        return await this.repo.findAll();
    }
}
