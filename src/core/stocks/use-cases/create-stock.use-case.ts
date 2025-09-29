import { StockRepositoryPort } from "../ports/stock-repository.port";
import { Stock } from "../stock";

export class CreateStockUseCase {
    constructor(private readonly repo: StockRepositoryPort) { }

    async execute(name: string, quantity: number, mount: number, userId: number): Promise<Stock> {
        const stock = new Stock(Date.now(), name, quantity, mount, userId);
        return await this.repo.save(stock);
    }
}
