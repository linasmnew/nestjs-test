import { Test, TestingModule } from '@nestjs/testing';
import { ChecklistsController } from './checklists.controller';
import { ChecklistsService } from './checklists.service';

describe('ChecklistsController', () => {
  let controller: ChecklistsController;

  const checklistsServiceMock = {
    findAll: jest.fn().mockResolvedValue([
      { id: 1, building: 'Harmony Tower', date: '2025-03-10', status: 'Pass' },
      { id: 2, building: 'Maple Apartments', date: '2025-03-08', status: 'Fail' },
    ]),
    findOne: jest.fn().mockResolvedValue({
      id: 1,
      building: 'Harmony Tower',
      date: '2025-03-10',
      status: 'Pass',
      inspector: 'John Doe',
      notes: 'All fire alarms working properly.',
    }),
  };

  beforeEach(async () => {
    // Mock the ChecklistsService
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChecklistsController],
      providers: [{ provide: ChecklistsService, useValue: checklistsServiceMock }],
    }).compile();

    controller = module.get<ChecklistsController>(ChecklistsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all checklists', async () => {
    const result = await controller.findAll();

    expect(result).toEqual([
      { id: 1, building: 'Harmony Tower', date: '2025-03-10', status: 'Pass' },
      { id: 2, building: 'Maple Apartments', date: '2025-03-08', status: 'Fail' },
    ]);
  });

  describe('findOne', () => {
    it('should call findOne with the correct ID', async () => {
      await controller.findOne('1');
      expect(checklistsServiceMock.findOne).toHaveBeenCalledWith(1);
    });  

    it('should return a single checklist', async () => {
      const result = await controller.findOne('1');

      expect(result).toEqual({
        id: 1,
        building: 'Harmony Tower',
        date: '2025-03-10', 
        status: 'Pass',
        inspector: 'John Doe',
        notes: 'All fire alarms working properly.',
      });
    });  
  });
});
