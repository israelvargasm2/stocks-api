import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { StockFromFinnhubApiRepositoryAdapter } from './adapters/stock-from-finnhub-api-repository.adapter';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard("jwt"))
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
