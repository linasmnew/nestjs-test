import { Test, TestingModule } from '@nestjs/testing';
import { ChecklistsService } from './checklists.service';
import { CreateChecklistDto } from './dto/create-checklist.dto';
import { ChecklistRepository } from './checklists.repository';

describe('ChecklistsService', () => {
  let service: ChecklistsService;
  let repositoryMock: Partial<ChecklistRepository>;

  beforeEach(async () => {
    // Create repository mock
    repositoryMock = {
      findAll: jest.fn().mockResolvedValue([
        { id: 1, building: 'Harmony Tower', date: new Date('2025-03-10'), status: 'Pass' },
        { id: 2, building: 'Maple Apartments', date: new Date('2025-03-08'), status: 'Fail' },
      ]),
      findOne: jest.fn().mockResolvedValue({
        id: 1, 
        building: 'Harmony Tower', 
        date: new Date('2025-03-10'), 
        status: 'Pass',
        inspector: 'John Doe',
        notes: 'All fire alarms working properly.',
      }),
      create: jest.fn().mockImplementation(() => Promise.resolve({
        id: 1,
        building: 'Harmony Tower',
        date: new Date('2025-03-10'),
        status: 'Pass',
        inspector: 'John Doe',
      })),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChecklistsService,
        {
          provide: ChecklistRepository,
          useValue: repositoryMock,
        }
      ],
    }).compile();

    service = module.get<ChecklistsService>(ChecklistsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all checklists', async () => {
    const result = await service.findAll();

    expect(result).toEqual([
      { id: 1, building: 'Harmony Tower', date: '2025-03-10', status: 'Pass' },
      { id: 2, building: 'Maple Apartments', date: '2025-03-08', status: 'Fail' },
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
        status: 'Pass',
        inspector: 'John Doe',
        notes: 'All fire alarms working properly.',
      });
    });
  })

  it('should create a checklist', async () => {
    const createChecklistDto: CreateChecklistDto = {
      name: 'Fire Safety Check',
      building: 'Harmony Tower',
      inspector: 'John Doe',
      notes: 'All fire alarms working properly.',
      status: 'Pass',
    };

    const result = await service.create(createChecklistDto);
    expect(result).toEqual('Checklist created successfully');
  });
});
