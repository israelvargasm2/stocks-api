import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { StockFromApiController } from './stock-from-api.controller';
import { StockFromAlphaVantageApiRepositoryAdapter } from './adapters/stock-from-alpha-vantage-api-repository.adapter';
import { StockFromFinnhubApiRepositoryAdapter } from './adapters/stock-from-finnhub-api-repository.adapter';
import { StockFromYahooFinanceRepositoryAdapter } from './adapters/stock-from-yahoo-finance-repository.adapter';

@Module({
  imports: [HttpModule],
  providers: [StockFromAlphaVantageApiRepositoryAdapter, StockFromFinnhubApiRepositoryAdapter, StockFromYahooFinanceRepositoryAdapter],
  controllers: [StockFromApiController]
})
export class StockFromApiModule {}
