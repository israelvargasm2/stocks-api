import { StockRepositoryPort } from "../ports/stock-repository.port";
import { Stock } from "../stock";

export class GetStockUseCase {
    constructor(private readonly repo: StockRepositoryPort) { }

    async execute(id: number): Promise<Stock | null> {
        return await this.repo.find(id);
    }
}
