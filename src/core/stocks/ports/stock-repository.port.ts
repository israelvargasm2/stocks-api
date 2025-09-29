import { Stock } from "../stock";

export interface StockRepositoryPort {
    findAll(): Promise<Stock[]>
    findByUser(id: number): Promise<Stock[]>
    find(id: number): Promise<Stock | null>
    save(stock: Stock): Promise<Stock>;
    update(id: number, stock: Stock): Promise<void>;
    delete(id: number): Promise<void>
}
