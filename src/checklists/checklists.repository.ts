import { Status } from './checklists.enums';
import { Checklist } from './entities/checklist.entity';

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

  findAll(): Promise<Checklist[]> {
    return Promise.resolve(this.checklists);
  }

  findOne(id: number): Promise<Checklist | null> {
    return Promise.resolve(this.checklists.find((checklist) => checklist.id === id) || null);
  }

  create(checklist: Checklist): Promise<Checklist> {
    // this.checklists.push(checklist);
    return Promise.resolve(checklist);
  }
}
