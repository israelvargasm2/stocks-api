import { StockOrmEntity } from "../entities/stock.orm-entity";
import { StockRepositoryPort } from "../ports/stock-repository.port";
import { Stock } from "../stock";

export class CreateStockUseCase {
    constructor(private readonly repo: StockRepositoryPort) { }

    async execute(name: string, quantity: number, mount: number): Promise<StockOrmEntity> {
        const stock = new Stock(Date.now(), name, quantity, mount);
        return await this.repo.save(stock);
    }
}
