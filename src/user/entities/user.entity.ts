import { IsBoolean, IsEmail, IsMobilePhone, IsString } from 'class-validator';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Point } from '../../point/entites/point.entity';

@Entity({ name: 'users' })
@Unique(['email', 'phone'])
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @IsString()
    @Column('varchar', { length: 30, nullable: false })
    name: string;

    @IsEmail()
    @Column('varchar', { length: 30, nullable: false })
    email: string;

    @IsString()
    @Column('varchar', { select: false, nullable: false })
    password: string;

    @IsMobilePhone('ko-KR')
    @Column('varchar', { nullable: false })
    phone: string;

    @IsBoolean()
    @Column('boolean', { select: false, default: false })
    admin: boolean;

    @OneToOne(() => Point, (point) => point.user)
    @JoinColumn()
    point: Point;
}