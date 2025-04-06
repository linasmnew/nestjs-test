import { plainToInstance } from 'class-transformer';
import { Injectable, Body, Inject } from '@nestjs/common';
import { CreateChecklistDto } from './dto/create-checklist.dto';
import { Checklist } from './entities/checklist.entity';
import { ListChecklistDto } from './dto/list-checklist.dto';
import { DetailChecklistDto } from './dto/detail-checklist.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ChecklistsService {
  constructor(
    @Inject('ChecklistsRepository')
    private checklistsRepository: Repository<Checklist>
  ) {}

  create(@Body() createChecklistDto: CreateChecklistDto) {
    return 'Checklist created successfully';
  }

  async findAll() {
    const checklists = await this.checklistsRepository.find();
    return plainToInstance(ListChecklistDto, checklists, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: number) {
    const checklist = await this.checklistsRepository.findOne({ where: { id } });
    return plainToInstance(DetailChecklistDto, checklist);
  }
}
