import { IsBoolean, IsEmail, IsMobilePhone, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity({name: 'users'})
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
    @Column('varchar', { nullable: false })
    password: string;

    @IsMobilePhone('ko-KR')
    @Column('varchar', { nullable: false })
    phone: string;

    @IsBoolean()
    @Column({ type: 'boolean', default: false })
    admin: boolean;
}