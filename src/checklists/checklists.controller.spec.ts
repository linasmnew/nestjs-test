import { Test, TestingModule } from '@nestjs/testing';
import { ChecklistsController } from './checklists.controller';
import { ChecklistsService } from './checklists.service';
import NotFoundError from '../exceptions/not-found.exception';
import { Status } from './checklists.enums';

describe('ChecklistsController', () => {
  let controller: ChecklistsController;

  const checklistsServiceMock = {
    findAll: jest.fn().mockResolvedValue([
      { id: 1, building: 'Harmony Tower', date: '2025-03-10', status: 'Pass' },
      {
        id: 2,
        building: 'Maple Apartments',
        date: '2025-03-08',
        status: 'Fail',
      },
    ]),
    findOne: jest.fn().mockResolvedValue({
      id: 1,
      building: 'Harmony Tower',
      date: '2025-03-10',
      status: 'Pass',
      inspector: 'John Doe',
      notes: 'All fire alarms working properly.',
    }),
    create: jest.fn().mockResolvedValue('Checklist created successfully'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChecklistsController],
      providers: [
        { provide: ChecklistsService, useValue: checklistsServiceMock },
      ],
    }).compile();

    controller = module.get<ChecklistsController>(ChecklistsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all checklists', async () => {
    const result = await controller.findAll({});

    expect(result).toEqual([
      { id: 1, building: 'Harmony Tower', date: '2025-03-10', status: 'Pass' },
      {
        id: 2,
        building: 'Maple Apartments',
        date: '2025-03-08',
        status: 'Fail',
      },
    ]);
  });

  describe('findOne', () => {
    it('should call service with the correct ID', async () => {
      await controller.findOne({ id: 1 });
      expect(checklistsServiceMock.findOne).toHaveBeenCalledWith(1);
    });

    it('should return a single checklist', async () => {
      const result = await controller.findOne({ id: 1 });

      expect(result).toEqual({
        id: 1,
        building: 'Harmony Tower',
        date: '2025-03-10',
        status: 'Pass',
        inspector: 'John Doe',
        notes: 'All fire alarms working properly.',
      });
    });

    it('should throw a NotFoundException exception when checklist is not found', async () => {
      checklistsServiceMock.findOne.mockResolvedValue(null);

      await expect(controller.findOne({ id: 7 })).rejects.toThrow(
        NotFoundError,
      );
    });
  });

  describe('create', () => {
    it('should call create with the correct data', async () => {
      await controller.create({
        building: 'Harmony Tower',
        inspector: 'John Doe',
        notes: 'All fire alarms working properly.',
        status: Status.PASS,
        date: '2025-03-10',
      });

      expect(checklistsServiceMock.create).toHaveBeenCalledWith({
        building: 'Harmony Tower',
        inspector: 'John Doe',
        notes: 'All fire alarms working properly.',
        status: Status.PASS,
        date: '2025-03-10',
      });
    });

    it('should return the correct response', async () => {
      const result = await controller.create({
        building: 'Harmony Tower',
        inspector: 'John Doe',
        notes: 'All fire alarms working properly.',
        status: Status.PASS,
        date: '2025-03-10',
      });

      expect(result).toEqual('Checklist created successfully');
    });
  });
});
