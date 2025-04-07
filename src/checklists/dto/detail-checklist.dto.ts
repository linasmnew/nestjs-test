import { Transform, Expose } from 'class-transformer';
import dayjs from 'dayjs';
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
  @Transform(({ value }) => dayjs(value).format('YYYY-MM-DD'))
  date: Date;
}
