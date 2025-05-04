import { Injectable } from '@nestjs/common';
import { FindOneOptions, Repository } from 'typeorm';
import { StockRepositoryPort } from '../ports/stock-repository.port';
import { InjectRepository } from '@nestjs/typeorm';
import { StockOrmEntity } from '../entities/stock.orm-entity';
import { Stock } from '../stock';

@Injectable()
export class StockDatabaseRepositoryAdapter implements StockRepositoryPort {
    constructor(
        @InjectRepository(StockOrmEntity)
        private stockRepository: Repository<StockOrmEntity>
    ) { }

    async findAll(): Promise<StockOrmEntity[]> {
        return (await this.stockRepository.find()).sort((a, b) => a.name.localeCompare(b.name, "es", { sensitivity: "base" }));
    }

    async find(id: number): Promise<StockOrmEntity | null> {
        return await this.stockRepository.findOne({ where: { id } });
    }

    async save(stock: Stock): Promise<StockOrmEntity> {
        const stockOrmEntity = new StockOrmEntity();
        stockOrmEntity.name = stock.name;
        stockOrmEntity.quantity = stock.quantity;
        stockOrmEntity.mount = stock.mount;
        return await this.stockRepository.save(stockOrmEntity);
    }

    async update(id: number, stock: Stock): Promise<void> {
        const stockOrmEntity = new StockOrmEntity();
        stockOrmEntity.name = stock.name;
        stockOrmEntity.quantity = stock.quantity;
        stockOrmEntity.mount = stock.mount;
        await this.stockRepository.update(id, stockOrmEntity);
    }

    async delete(id: number): Promise<void> {
        await this.stockRepository.delete(id);
    }
}
