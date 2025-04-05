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
      .expect('This action returns all checklists');
  });
});
