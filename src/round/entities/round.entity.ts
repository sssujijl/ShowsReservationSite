import { IsNumber, IsString } from 'class-validator';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'rounds' })
export class Round {
    @PrimaryGeneratedColumn()
    id: number;

    @IsNumber()
    @Column({ type: 'int', nullable: false })
    seat_count?: number;

    @IsString()
    @Column({ type: 'varchar', nullable: false })
    content: string;

    @Column({ type: 'date', nullable: false })
    datetime: Date;

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
}