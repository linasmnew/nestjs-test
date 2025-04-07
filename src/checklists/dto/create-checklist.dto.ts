import { IsEnum, IsNotEmpty } from 'class-validator';
import { Status } from '../checklists.enums';

export class CreateChecklistDto {
  @IsNotEmpty()
  building: string;

  @IsNotEmpty()
  inspector: string;

  @IsNotEmpty()
  notes: string;

  @IsNotEmpty()
  @IsEnum(Status)
  status: Status;
}
