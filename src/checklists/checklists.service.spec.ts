import { Test, TestingModule } from '@nestjs/testing';
import { ChecklistsService } from './checklists.service';
import { Checklist } from './entities/checklist.entity';
import { Repository } from 'typeorm';
import { CreateChecklistDto } from './dto/create-checklist.dto';

describe('ChecklistsService', () => {
  let service: ChecklistsService;
  let repositoryMock: Partial<Repository<Checklist>>;

  beforeEach(async () => {
    // Create repository mock
    repositoryMock = {
      find: jest.fn().mockResolvedValue([
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
      save: jest.fn().mockImplementation(() => Promise.resolve({})),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChecklistsService,
        {
          provide: 'ChecklistsRepository',
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
      expect(repositoryMock.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
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
