import { StockOrmEntity } from 'src/core/stocks/entities/stock.orm-entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('users')
export class UserOrmEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    picture: string;

    @Column()
    provider: string;

    @OneToMany(() => StockOrmEntity, (stock) => stock.user)
    stocks: StockOrmEntity[];
}
