import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ChecklistsService } from './checklists.service';
import { CreateChecklistDto } from './dto/create-checklist.dto';
import NotFoundError from '../exceptions/not-found.exception';
import { FindOneParams } from './params/find-one.params';

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
  async findOne(@Param() params: FindOneParams) {
    const checklist = await this.checklistsService.findOne(params.id);

    if (!checklist) {
      throw new NotFoundError('Checklist', params.id);
    }
    return checklist;
  }
}
