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
            for (let symbol of symbols) {
                const result = await yahoo.default.quote(symbol);
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
