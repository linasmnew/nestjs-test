import { Transform, Expose } from 'class-transformer';
import * as dayjs from 'dayjs';
import { Status } from '../checklists.enums';

export class ListChecklistDto {
    @Expose()
    id: number;
    @Expose()
    building: string;
    @Expose()
    status: Status;
    @Expose()
    @Transform(({ value }) => dayjs(value).format('YYYY-MM-DD'))
    date: Date;
}
