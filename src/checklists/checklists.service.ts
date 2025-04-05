import { Injectable } from '@nestjs/common';
import { CreateChecklistDto } from './dto/create-checklist.dto';

@Injectable()
export class ChecklistsService {
  create(createChecklistDto: CreateChecklistDto) {
    return 'This action adds a new checklist';
  }

  findAll() {
    return `This action returns all checklists`;
  }

  findOne(id: number) {
    return `This action returns a #${id} checklist`;
  }
}
