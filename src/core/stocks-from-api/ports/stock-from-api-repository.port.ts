import { StockFromApi } from "../stock-from-api";

export interface StockFromApiRepositoryPort {
    findStocks(symbols: string[]): Promise<StockFromApi[]>
}
