import { StockFromApiRepositoryPort } from "../ports/stock-from-api-repository.port";
import { StockFromApi } from "../stock-from-api";

export class ListStocksFromApiUseCase {
    constructor(private readonly repo: StockFromApiRepositoryPort) { }

    async execute(symbols: string[]): Promise<StockFromApi[]> {
        return await this.repo.findStocks(symbols);
    }
}
