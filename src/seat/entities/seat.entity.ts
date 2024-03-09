import { IsNumber } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Section } from '../types/seatSection.type';

@Entity({ name: 'seats' })
export class Seat {
    @PrimaryGeneratedColumn()
    id: number;

    @IsNumber()
    @Column({ type: 'int', nullable: false })
    hallId: number;

    @Column({ type: 'enum', enum: Section })
    section: Section

    @IsNumber()
    @Column({ type: 'int', nullable: false })
    sectionNumber: number;
}