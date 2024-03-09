import { IsNumber } from 'class-validator';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Status } from '../types/seatStatus.type';

@Entity({ name: 'roundSeats' })
export class RoundSeat {
    @PrimaryGeneratedColumn()
    id: number;

    @IsNumber()
    @Column({ type: 'int', nullable: false })
    roundId: number;

    @IsNumber()
    @Column({ type: 'int', nullable: false })
    seatId: number;

    @IsNumber()
    @Column({ type: 'int', nullable: false })
    price: string;

    @Column({ type: 'enum', enum: Status, default: Status.BEFORE })
    status: Status

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
}