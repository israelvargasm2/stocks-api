import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity("stocks")
export class StockOrmEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: "real" })
    quantity: number;

    @Column({ type: "real" })
    mount: number;
}
