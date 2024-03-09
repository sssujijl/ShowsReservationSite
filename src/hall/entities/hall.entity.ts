import { IsBoolean, IsEmail, IsMobilePhone, IsNumber, IsString } from 'class-validator';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity({ name: 'halls' })
export class Hall {
    @PrimaryGeneratedColumn()
    id: number;

    @IsString()
    @Column('varchar', { nullable: false })
    name: string;

    @IsString()
    @Column('varchar', { nullable: false })
    address: string;

    @IsNumber()
    @Column('int', { nullable: false })
    seat_count?: number;

}