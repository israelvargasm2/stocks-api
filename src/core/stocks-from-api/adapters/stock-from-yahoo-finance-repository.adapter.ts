import { Injectable } from '@nestjs/common';
import { StockFromApiRepositoryPort } from '../ports/stock-from-api-repository.port';
import { StockFromApi } from '../stock-from-api';
import * as yahoo from 'yahoo-finance2';

@Injectable()
export class StockFromYahooFinanceRepositoryAdapter implements StockFromApiRepositoryPort {

    constructor() { 
        yahoo.default.suppressNotices(['yahooSurvey']);
    }

    async findStocks(symbols: string[]): Promise<StockFromApi[]> {
        const currentPrices: StockFromApi[] = [];
        if (symbols) {
            const results = await yahoo.default.quote(symbols);
            for (let result of results) {
                const symbol = result.symbol as string;
                let price = result.regularMarketPrice as number;
                if (result.currency === "MXN") {
                    const usdToMxn = await yahoo.default.quote("USDMXN=X");
                    price = price / (usdToMxn.regularMarketPrice as number);
                }
                currentPrices.push({ symbol, price });
            }
        }
        return currentPrices;
    }
}
