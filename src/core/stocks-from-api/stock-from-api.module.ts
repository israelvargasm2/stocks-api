import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { StockFromApiController } from './stock-from-api.controller';
import { StockFromAlphaVantageApiRepositoryAdapter } from './adapters/stock-from-alpha-vantage-api-repository.adapter';
import { StockFromFinnhubApiRepositoryAdapter } from './adapters/stock-from-finnhub-api-repository.adapter';

@Module({
  imports: [HttpModule],
  providers: [StockFromAlphaVantageApiRepositoryAdapter, StockFromFinnhubApiRepositoryAdapter],
  controllers: [StockFromApiController]
})
export class StockFromApiModule {}
