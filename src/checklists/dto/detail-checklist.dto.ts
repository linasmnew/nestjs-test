import { Expose } from 'class-transformer';
import { Status } from '../checklists.enums';

export class DetailChecklistDto {
  @Expose()
  id: number;

  @Expose()
  building: string;

  @Expose()
  status: Status;

  @Expose()
  inspector: string;

  @Expose()
  notes: string;

  @Expose()
  date: Date;
}
