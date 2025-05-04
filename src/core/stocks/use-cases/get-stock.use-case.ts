import { StockOrmEntity } from "../entities/stock.orm-entity";
import { StockRepositoryPort } from "../ports/stock-repository.port";

export class GetStockStockUseCase {
    constructor(private readonly repo: StockRepositoryPort) { }

    async execute(id: number): Promise<StockOrmEntity | null> {
        return await this.repo.find(id);
    }
}
