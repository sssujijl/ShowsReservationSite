import { IsDate, IsNumber, IsString } from 'class-validator';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Category } from '../types/showCategory.type';


@Entity({ name: 'shows' })
export class Show {
    @PrimaryGeneratedColumn()
    id: number;

    @IsString()
    @Column({ type: 'varchar', nullable: false })
    title: string;

    @IsString()
    @Column({ type: 'varchar', nullable: false })
    content: string;

    @Column({ type: 'enum', enum: Category })
    category: Category

    @IsNumber()
    @Column({ type: 'int', nullable: false })
    hallId: number;

    @IsDate()
    @Column({ type: 'date', nullable: false })
    startDate: Date;

    @IsDate()
    @Column({ type: 'date', nullable: false })
    endDate: Date;

    @IsDate()
    @Column({ type: 'date', nullable: false })
    ticketingDate: Date;

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
}