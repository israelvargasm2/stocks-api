import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { StockFromYahooFinanceRepositoryAdapter } from './adapters/stock-from-yahoo-finance-repository.adapter';

@UseGuards(AuthGuard("jwt"))
@Controller('stocks-from-api')
export class StockFromApiController {
    constructor(private readonly repoAdapter: StockFromYahooFinanceRepositoryAdapter) { }

    @Get()
    async getStocks(@Query('symbol') symbols: string[]) {
        if (typeof symbols === "string") {
            symbols = [symbols];
        }
        return this.repoAdapter.findStocks(symbols);
    }
}
