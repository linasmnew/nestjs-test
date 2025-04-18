import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Status } from '../checklists.enums';

@Entity()
export class Checklist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  building: string;

  @Column()
  date: string;

  @Column()
  inspector: string;

  @Column()
  notes: string;

  @Column({
    type: 'enum',
    enum: Status,
  })
  status: Status;
}
