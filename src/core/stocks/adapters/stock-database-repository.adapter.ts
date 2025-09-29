import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { StockRepositoryPort } from '../ports/stock-repository.port';
import { InjectRepository } from '@nestjs/typeorm';
import { StockOrmEntity } from '../entities/stock.orm-entity';
import { Stock } from '../stock';
import { UserOrmEntity } from 'src/core/users/entities/user-orm.entity';

@Injectable()
export class StockDatabaseRepositoryAdapter implements StockRepositoryPort {
    constructor(
        @InjectRepository(StockOrmEntity)
        private stockRepository: Repository<StockOrmEntity>,
        @InjectRepository(UserOrmEntity)
        private userRepository: Repository<UserOrmEntity>,
    ) { }

    async findAll(): Promise<Stock[]> {
        return (await this.stockRepository.find({ relations: ["user"] })).sort((a, b) => a.name.localeCompare(b.name, "es", { sensitivity: "base" }))
            .map(item => new Stock(item.id, item.name, item.quantity, item.mount, item.user.id));
    }

    async findByUser(id: number): Promise<Stock[]> {
        return (await this.stockRepository.find({ where: { user: { id } }, relations: ["user"] })).sort((a, b) => a.name.localeCompare(b.name, "es", { sensitivity: "base" }))
            .map(item => new Stock(item.id, item.name, item.quantity, item.mount, item.user.id));
    }

    async find(id: number): Promise<Stock | null> {
        const stockOrmEntity = await this.stockRepository.findOne({ where: { id }, relations: ["user"] });
        if (stockOrmEntity) {
            return new Stock(stockOrmEntity.id, stockOrmEntity.name, stockOrmEntity.quantity, stockOrmEntity.mount, stockOrmEntity.user.id);
        } else {
            return null;
        }
    }

    async save(stock: Stock): Promise<Stock> {
        const user = await this.userRepository.findOne({ where: { id: stock.userId } });
        const stockOrmEntity = await this.stockRepository.save({
            name: stock.name,
            quantity: stock.quantity,
            mount: stock.mount,
            user: user as UserOrmEntity
        });
        return new Stock(stockOrmEntity.id, stockOrmEntity.name, stockOrmEntity.quantity, stockOrmEntity.mount, stockOrmEntity.user.id);
    }

    async update(id: number, stock: Stock): Promise<void> {
        const user = await this.userRepository.findOne({ where: { id: stock.userId } });
        await this.stockRepository.update(id, {
            name: stock.name,
            quantity: stock.quantity,
            mount: stock.mount,
            user: user as UserOrmEntity
        });
    }

    async delete(id: number): Promise<void> {
        await this.stockRepository.delete(id);
    }
}
