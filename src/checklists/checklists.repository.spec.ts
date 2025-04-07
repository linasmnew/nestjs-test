import { ChecklistRepository } from './checklists.repository';
import { Status } from './checklists.enums';

describe('ChecklistRepository', () => {
  let repository: ChecklistRepository;

  beforeEach(() => {
    repository = new ChecklistRepository();
  });

  describe('findAll', () => {
    it('should return all checklists', async () => {
      const checklists = await repository.findAll({});

      expect(checklists).toEqual([
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
      ]);
    });
  });

  describe('findOne', () => {
    it('should return the found checklist', async () => {
      const checklist = await repository.findOne(1);

      expect(checklist).toEqual({
        id: 1,
        building: 'Harmony Tower',
        date: new Date('2025-03-10'),
        status: Status.PASS,
        inspector: 'John Doe',
        notes: 'All fire alarms working properly.',
      });
    });

    it('should return null when given a non-existent id', async () => {
      const checklist = await repository.findOne(7);
      expect(checklist).toBeNull();
    });
  });

  describe('create', () => {
    it('should return the created checklist', async () => {
      const newChecklist = {
        building: 'Cedar Heights',
        status: Status.PASS,
        inspector: 'Alex Johnson',
        notes: 'Sprinkler system fully operational.',
      };

      const result = await repository.create(newChecklist);
      expect(result).toEqual({
        id: 3,
        ...newChecklist,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        date: expect.any(Date),
      });
    });
  });
});
