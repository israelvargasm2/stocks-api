import { Module } from '@nestjs/common';
import { StockOrmEntity } from './entities/stock.orm-entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockController } from './stock.controller';
import { StockDatabaseRepositoryAdapter } from './adapters/stock-database-repository.adapter';
import { UserOrmEntity } from '../users/entities/user-orm.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([StockOrmEntity]),
        TypeOrmModule.forFeature([UserOrmEntity]),
    ],
    providers: [StockDatabaseRepositoryAdapter],
    controllers: [StockController]
})
export class StockModule { }
