import { Module } from '@nestjs/common';
import { StockOrmEntity } from './entities/stock.orm-entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockController } from './stock.controller';
import { StockDatabaseRepositoryAdapter } from './adapters/stock-database-repository.adapter';

@Module({
    imports: [TypeOrmModule.forFeature([StockOrmEntity])],
    providers: [StockDatabaseRepositoryAdapter],
    controllers: [StockController]
})
export class StockModule { }
