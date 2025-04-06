import { Controller, Get, Post, Body, Param, NotFoundException } from '@nestjs/common';
import { ChecklistsService } from './checklists.service';
import { CreateChecklistDto } from './dto/create-checklist.dto';

@Controller('checklists')
export class ChecklistsController {
  constructor(private readonly checklistsService: ChecklistsService) {}

  @Post()
  async create(@Body() createChecklistDto: CreateChecklistDto) {
    return await this.checklistsService.create(createChecklistDto);
  }

  @Get()
  async findAll() {
    return await this.checklistsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const checklist = await this.checklistsService.findOne(id);

    if (!checklist) {
      throw new NotFoundException('Checklist not found');
    }
    return checklist;
  }
}
