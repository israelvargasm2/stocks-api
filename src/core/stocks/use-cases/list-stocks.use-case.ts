import { StockRepositoryPort } from "../ports/stock-repository.port";
import { Stock } from "../stock";

export class ListStocksStockUseCase {
    constructor(private readonly repo: StockRepositoryPort) { }

    async execute(): Promise<Stock[]> {
        return await this.repo.findAll();
    }
}
