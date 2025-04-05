import { Injectable } from '@nestjs/common';
import { CreateChecklistDto } from './dto/create-checklist.dto';

@Injectable()
export class ChecklistsService {
  create(createChecklistDto: CreateChecklistDto) {
    return 'This action adds a new checklist';
  }

  findAll() {
    return [
      { 'id': 1, 'building': 'Harmony Tower', 'date': '2025-03-10', 'status': 'Pass' },
      { 'id': 2, 'building': 'Maple Apartments', 'date': '2025-03-08', 'status': 'Fail' },
    ];
  }

  findOne(id: number) {
    return {
      'id': 1,
      'building': 'Harmony Tower',
      'date': '2025-03-10',
      'status': 'Pass',
      'inspector': 'John Doe',
      'notes': 'All fire alarms working properly.',
    };
  }
}
