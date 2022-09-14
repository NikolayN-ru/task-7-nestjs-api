import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { hash } from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid';

@Entity({ name: 'users' })
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    uuid: string;

    @Column()
    email: string;

    @Column({ select: false })
    password: string;

    @Column()
    nickname: string;

    @BeforeInsert()
    async hashPassword() {
        this.password = await hash(this.password, 10);
    }

    @BeforeInsert()
    async createUuid() {
        this.uuid = await uuidv4();
    }
}
