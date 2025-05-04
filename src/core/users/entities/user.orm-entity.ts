import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity("users")
export class UserOrmEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;
}
