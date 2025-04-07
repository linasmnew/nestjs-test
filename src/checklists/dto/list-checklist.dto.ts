import { PickType } from '@nestjs/mapped-types';
import { DetailChecklistDto } from './detail-checklist.dto';

export class ListChecklistDto extends PickType(DetailChecklistDto, [
  'id',
  'building',
  'status',
  'date',
]) {}
