import { IsEnum, IsNotEmpty, IsDateString } from 'class-validator';
import { Status } from '../checklists.enums';
import { Transform } from 'class-transformer';
import dayjs from 'dayjs';

export class CreateChecklistDto {
  @IsNotEmpty()
  building: string;

  @IsNotEmpty()
  inspector: string;

  @IsNotEmpty()
  @IsDateString()
  @Transform(({ value }: { value: string }) =>
    dayjs(value).format('YYYY-MM-DD'),
  )
  date: string;

  @IsNotEmpty()
  notes: string;

  @IsNotEmpty()
  @IsEnum(Status)
  status: Status;
}
