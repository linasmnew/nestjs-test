import { Status } from './checklists.enums';
import { Checklist } from './entities/checklist.entity';
import { FindAllChecklistsDto } from './dto/find-all-checklists.dto';
import { CreateChecklistDto } from './dto/create-checklist.dto';

export class ChecklistRepository {
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

  findAll(query: FindAllChecklistsDto): Promise<Checklist[]> {
    const {
      status,
      // page = 1,
      // limit = 10
    } = query;
    const filteredChecklists = this.checklists.filter((checklist) => {
      if (status && checklist.status !== status) return false;
      return true;
    });

    return Promise.resolve(filteredChecklists);
  }

  findOne(id: number): Promise<Checklist | null> {
    return Promise.resolve(
      this.checklists.find((checklist) => checklist.id === id) || null,
    );
  }

  create(checklist: CreateChecklistDto): Promise<Checklist> {
    return Promise.resolve({
      id: this.checklists.length + 1,
      ...checklist,
      date: new Date(),
    });
  }
}
