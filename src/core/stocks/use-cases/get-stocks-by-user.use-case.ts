import { StockRepositoryPort } from "../ports/stock-repository.port";
import { Stock } from "../stock";

export class GetStocksByUserUseCase {
    constructor(private readonly repo: StockRepositoryPort) { }

    async execute(id: number): Promise<Stock[]> {
        return await this.repo.findByUser(id);
    }
}
