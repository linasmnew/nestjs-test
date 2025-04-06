import { Transform } from 'class-transformer';
import * as dayjs from 'dayjs';
import { Status } from '../checklists.enums';

export class DetailChecklistDto {
    id: number;
    building: string;
    status: Status;
    inspector: string;
    notes: string;
    @Transform(({ value }) => dayjs(value).format('YYYY-MM-DD'))
    date: Date;
}
