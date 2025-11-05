import { UserOrmEntity } from 'src/core/users/entities/user-orm.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

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

    @ManyToOne(() => UserOrmEntity, (user) => user.stocks, { onDelete: "CASCADE" })
    @JoinColumn({ name: "user_id" })
    user: UserOrmEntity;
}
