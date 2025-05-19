import { Controller, Get, Query } from '@nestjs/common';
import { StockFromFinnhubApiRepositoryAdapter } from './adapters/stock-from-finnhub-api-repository.adapter';

@Controller('stocks-from-api')
export class StockFromApiController {
    constructor(private readonly repoAdapter: StockFromFinnhubApiRepositoryAdapter) { }

    @Get()
    async getStocks(@Query('symbol') symbols: string[]) {
        if (typeof symbols === "string") {
            symbols = [symbols];
        }
        return this.repoAdapter.findStocks(symbols);
    }
}
