import { StockRepositoryPort } from "../ports/stock-repository.port";
import { Stock } from "../stock";

export class UpdateStockUseCase {
    constructor(private readonly repo: StockRepositoryPort) { }

    async execute(id: number, name: string, quantity: number, mount: number, userId: number): Promise<void> {
        const stock = new Stock(id, name, quantity, mount, userId);
        await this.repo.update(id, stock);
    }
}
