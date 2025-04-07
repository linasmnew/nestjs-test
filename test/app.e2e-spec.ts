import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { ChecklistsModule } from './../src/checklists/checklists.module';
import HttpExceptionFilter from '../src/exceptions/filters/http-exception-filter';
import BadRequestError from '../src/exceptions/bad-request.exception';

describe('ChecklistsController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ChecklistsModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalFilters(new HttpExceptionFilter());

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        exceptionFactory: (errors) => {
          const messages = errors.reduce<string[]>((acc, error) => {
            if (error.constraints) {
              acc.push(...Object.values(error.constraints));
            }
            return acc;
          }, []);
          return new BadRequestError(messages);
        },
      }),
    );

    await app.init();
  });

  describe('/checklists (GET)', () => {
    it('/checklists (GET)', () => {
      return request(app.getHttpServer())
        .get('/checklists')
        .expect(200)
        .expect([
          {
            id: 1,
            building: 'Harmony Tower',
            date: '2025-03-10',
            status: 'Pass',
          },
          {
            id: 2,
            building: 'Maple Apartments',
            date: '2025-03-08',
            status: 'Fail',
          },
        ]);
    });

    it('/checklists (GET) - Filter by status (Pass)', () => {
      return request(app.getHttpServer())
        .get('/checklists?status=Pass')
        .expect(200)
        .expect([
          {
            id: 1,
            building: 'Harmony Tower',
            date: '2025-03-10',
            status: 'Pass',
          },
        ]);
    });

    it('/checklists (GET) - Filter by status (Fail)', () => {
      return request(app.getHttpServer())
        .get('/checklists?status=Fail')
        .expect(200)
        .expect([
          {
            id: 2,
            building: 'Maple Apartments',
            date: '2025-03-08',
            status: 'Fail',
          },
        ]);
    });
  });

  describe('/checklists/:id (GET)', () => {
    it('/checklists/:id (GET)', () => {
      return request(app.getHttpServer())
        .get('/checklists/1')
        .expect(200)
        .expect({
          id: 1,
          building: 'Harmony Tower',
          date: '2025-03-10',
          status: 'Pass',
          inspector: 'John Doe',
          notes: 'All fire alarms working properly.',
        });
    });

    it('/checklists/:id (GET) - Not Found', () => {
      return request(app.getHttpServer())
        .get('/checklists/7')
        .expect(404)
        .expect({
          title: 'Not Found',
          status: 404,
          detail: 'The resource you requested could not be found.',
          errors: [{ message: "Checklist with identifier '7' was not found" }],
        });
    });

    it('/checklists/:id (GET) - Invalid ID', () => {
      return request(app.getHttpServer())
        .get('/checklists/invalid')
        .expect(400)
        .expect({
          title: 'Bad Request',
          status: 400,
          detail:
            'The request could not be processed. Please check your input and try again.',
          errors: [{ message: 'id must be an integer number' }],
        });
    });
  });
});
