import { IsBoolean, IsEmail, IsMobilePhone, IsNumber, IsString } from 'class-validator';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity({name: 'points'})
export class Point {
    @PrimaryGeneratedColumn()
    id: number;

    @IsNumber()
    @Column( 'int', { nullable: false })
    userId: number;

    @IsNumber()
    @Column('int', { nullable: false })
    point: number;

    @OneToOne(() => User, (user) => user.point)
    @JoinColumn({ name: 'userId' })
    user: User;
}