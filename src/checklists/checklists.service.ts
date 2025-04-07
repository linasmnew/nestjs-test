import { plainToInstance } from 'class-transformer';
import { Injectable } from '@nestjs/common';
import { CreateChecklistDto } from './dto/create-checklist.dto';
import { ListChecklistDto } from './dto/list-checklist.dto';
import { DetailChecklistDto } from './dto/detail-checklist.dto';
import { ChecklistRepository } from './checklists.repository';
import { FindAllChecklistsDto } from './dto/find-all-checklists.dto';

@Injectable()
export class ChecklistsService {
  constructor(private checklistsRepository: ChecklistRepository) {}

  async create(checklist: CreateChecklistDto) {
    return await this.checklistsRepository.create(checklist);
  }

  async findAll(query: FindAllChecklistsDto) {
    const checklists = await this.checklistsRepository.findAll(query);
    return plainToInstance(ListChecklistDto, checklists, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: number) {
    const checklist = await this.checklistsRepository.findOne(id);
    return plainToInstance(DetailChecklistDto, checklist);
  }
}
