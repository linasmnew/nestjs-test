import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ChecklistsService } from './checklists.service';
import { CreateChecklistDto } from './dto/create-checklist.dto';
import NotFoundError from '../exceptions/not-found.exception';
import { FindOneParams } from './dto/find-one.params';
import { FindAllChecklistsDto } from './dto/find-all-checklists.dto';

@Controller('checklists')
export class ChecklistsController {
  constructor(private readonly checklistsService: ChecklistsService) {}

  @Post()
  async create(@Body() checklistDto: CreateChecklistDto) {
    return await this.checklistsService.create(checklistDto);
  }

  @Get()
  async findAll(@Query() query: FindAllChecklistsDto) {
    return await this.checklistsService.findAll(query);
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
