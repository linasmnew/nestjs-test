import { plainToInstance } from 'class-transformer';
import { Injectable, Body } from '@nestjs/common';
import { CreateChecklistDto } from './dto/create-checklist.dto';
import { ListChecklistDto } from './dto/list-checklist.dto';
import { DetailChecklistDto } from './dto/detail-checklist.dto';
import { ChecklistRepository } from './checklists.repository';

@Injectable()
export class ChecklistsService {
  constructor(
    private checklistsRepository: ChecklistRepository
  ) {}

  create(@Body() createChecklistDto: CreateChecklistDto) {
    return 'Checklist created successfully';
  }

  async findAll() {
    const checklists = await this.checklistsRepository.findAll();
    return plainToInstance(ListChecklistDto, checklists, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: number) {
    const checklist = await this.checklistsRepository.findOne(id);
    return plainToInstance(DetailChecklistDto, checklist);
  }
}
