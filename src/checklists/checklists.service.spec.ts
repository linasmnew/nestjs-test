import { Test, TestingModule } from '@nestjs/testing';
import { ChecklistsService } from './checklists.service';
import { CreateChecklistDto } from './dto/create-checklist.dto';
import { ChecklistRepository } from './checklists.repository';
import { Status } from './checklists.enums';

describe('ChecklistsService', () => {
  let service: ChecklistsService;
  let repositoryMock: Partial<ChecklistRepository>;

  beforeEach(async () => {
    repositoryMock = {
      findAll: jest.fn().mockResolvedValue([
        {
          id: 1,
          building: 'Harmony Tower',
          date: '2025-03-10',
          status: Status.PASS,
        },
        {
          id: 2,
          building: 'Maple Apartments',
          date: '2025-03-08',
          status: Status.FAIL,
        },
      ]),
      findOne: jest.fn().mockResolvedValue({
        id: 1,
        building: 'Harmony Tower',
        date: '2025-03-10',
        status: Status.PASS,
        inspector: 'John Doe',
        notes: 'All fire alarms working properly.',
      }),
      create: jest.fn().mockImplementation(() =>
        Promise.resolve({
          id: 3,
          building: 'Harmony Tower',
          date: '2025-03-10',
          status: Status.PASS,
          inspector: 'John Doe',
          notes: 'All fire alarms working properly.',
        }),
      ),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChecklistsService,
        {
          provide: ChecklistRepository,
          useValue: repositoryMock,
        },
      ],
    }).compile();

    service = module.get<ChecklistsService>(ChecklistsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all checklists', async () => {
    const result = await service.findAll({});

    expect(result).toEqual([
      { id: 1, building: 'Harmony Tower', date: '2025-03-10', status: 'Pass' },
      {
        id: 2,
        building: 'Maple Apartments',
        date: '2025-03-08',
        status: Status.FAIL,
      },
    ]);
  });

  describe('findOne', () => {
    it('should invoke findOne with the right id', async () => {
      await service.findOne(1);
      expect(repositoryMock.findOne).toHaveBeenCalledWith(1);
    });

    it('should return the found checklist', async () => {
      const result = await service.findOne(1);

      expect(result).toEqual({
        id: 1,
        building: 'Harmony Tower',
        date: '2025-03-10',
        status: Status.PASS,
        inspector: 'John Doe',
        notes: 'All fire alarms working properly.',
      });
    });
  });

  describe('create', () => {
    it('should invoke repository with the right data', async () => {
      const checklistDto: CreateChecklistDto = {
        building: 'Harmony Tower',
        inspector: 'John Doe',
        notes: 'All fire alarms working properly.',
        status: Status.PASS,
        date: '2025-03-10',
      };

      await service.create(checklistDto);
      expect(repositoryMock.create).toHaveBeenCalledWith(checklistDto);
    });

    it('should return the created checklist', async () => {
      const checklistDto: CreateChecklistDto = {
        building: 'Harmony Tower',
        inspector: 'John Doe',
        notes: 'All fire alarms working properly.',
        status: Status.PASS,
        date: '2025-03-10',
      };

      const result = await service.create(checklistDto);
      expect(result).toEqual({
        id: 3,
        building: 'Harmony Tower',
        date: '2025-03-10',
        status: Status.PASS,
        inspector: 'John Doe',
        notes: 'All fire alarms working properly.',
      });
    });
  });
});
