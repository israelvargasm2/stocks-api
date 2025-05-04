import { StockRepositoryPort } from "../ports/stock-repository.port";

export class DeleteStockUseCase {
    constructor(private readonly repo: StockRepositoryPort) { }

    async execute(id: number): Promise<void> {
        await this.repo.delete(id);
    }
}
