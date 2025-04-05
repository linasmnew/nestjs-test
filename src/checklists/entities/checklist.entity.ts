import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Status } from '../checklists.enums';

@Entity()
export class Checklist {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    building: string;

    @Column()
    date: Date;

    @Column({
        type: 'enum',
        enum: Status,
    })
    status: Status;   
}
