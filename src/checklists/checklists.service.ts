import { plainToInstance } from 'class-transformer';
import { Injectable, Body } from '@nestjs/common';
import { CreateChecklistDto } from './dto/create-checklist.dto';
import { Checklist } from './entities/checklist.entity';
import { Status } from './checklists.enums';
import { ListChecklistDto } from './dto/list-checklist.dto';
import { DetailChecklistDto } from './dto/detail-checklist.dto';

@Injectable()
export class ChecklistsService {
  private readonly checklists: Checklist[] = [
    {
      id: 1,
      building: 'Harmony Tower',
      date: new Date('2025-03-10'),
      status: Status.PASS,
      inspector: 'John Doe',
      notes: 'All fire alarms working properly.',
    },
    {
      id: 2,
      building: 'Maple Apartments',
      date: new Date('2025-03-08'),
      status: Status.FAIL,
      inspector: 'Jane Smith',
      notes: 'Faults in fire alarms have been reported.',
    },
  ];

  create(@Body() createChecklistDto: CreateChecklistDto) {
    return 'Checklist created successfully';
  }

  findAll() {
    return plainToInstance(ListChecklistDto, this.checklists, {
      excludeExtraneousValues: true,
    });
  }

  findOne(id: number) {
    return plainToInstance(DetailChecklistDto, this.checklists.find(checklist => checklist.id === id));
  }
}
