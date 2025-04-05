import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { ChecklistsModule } from './../src/checklists/checklists.module';

describe('ChecklistsController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ChecklistsModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/checklists (GET)', () => {
    return request(app.getHttpServer())
      .get('/checklists')
      .expect(200)
      .expect([
        { id: 1, building: 'Harmony Tower', date: '2025-03-10', status: 'Pass' },
        { id: 2, building: 'Maple Apartments', date: '2025-03-08', status: 'Fail' },
      ]);
  });

  it('/checklists/:id (GET)', () => {
    return request(app.getHttpServer())
      .get('/checklists/1')
      .expect(200)
      .expect({ id: 1, building: 'Harmony Tower', date: '2025-03-10', status: 'Pass', inspector: 'John Doe', notes: 'All fire alarms working properly.' });
  });
});
