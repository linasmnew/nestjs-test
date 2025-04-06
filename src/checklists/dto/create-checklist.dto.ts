import { IsEnum, IsNotEmpty } from 'class-validator';
import { Status } from '../checklists.enums';

export class CreateChecklistDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEnum(Status)
    status: string;
}
