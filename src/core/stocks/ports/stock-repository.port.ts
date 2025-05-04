import { Stock } from "../stock";
import { StockOrmEntity } from "../entities/stock.orm-entity";

export interface StockRepositoryPort {
    findAll(): Promise<StockOrmEntity[]>
    find(id: number): Promise<StockOrmEntity | null>
    save(stock: Stock): Promise<StockOrmEntity>;
    update(id: number, stock: Stock): Promise<void>;
    delete(id: number): Promise<void>
}
