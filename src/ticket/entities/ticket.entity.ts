import { IsNumber } from 'class-validator';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'tickets' })
export class Ticket {
    @PrimaryGeneratedColumn()
    id: number;

    @IsNumber()
    @Column({ type: 'int', nullable: false })
    userId: number;

    @IsNumber()
    @Column({ type: 'int', nullable: false })
    roundSeatId: number;

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
}