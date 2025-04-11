import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
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
          const details = errors.reduce<Record<string, string[]>>(
            (acc, validation) => {
              acc[validation.property] = Object.values(
                validation.constraints || {},
              );
              return acc;
            },
            {},
          );
          return new BadRequestError(details);
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
          details: 'The resource you requested could not be found.',
          message: "Checklist with identifier '7' was not found",
        });
    });

    it('/checklists/:id (GET) - Invalid ID', () => {
      return request(app.getHttpServer())
        .get('/checklists/invalid')
        .expect(400)
        .expect({
          details: { id: ['id must be an integer number'] },
          message: 'The request could not be processed.',
        });
    });
  });

  describe('/checklists (POST)', () => {
    it('/checklists (POST)', () => {
      return request(app.getHttpServer())
        .post('/checklists')
        .send({
          building: 'Harmony Tower',
          date: new Date('03/10/2025'),
          status: 'Pass',
          inspector: 'John Doe',
          notes: 'All fire alarms working properly.',
        })
        .expect(201)
        .expect({
          id: 3,
          building: 'Harmony Tower',
          date: '2025-03-10',
          status: 'Pass',
          inspector: 'John Doe',
          notes: 'All fire alarms working properly.',
        });
    });

    it('/checklists (POST) - Invalid Date', () => {
      return request(app.getHttpServer())
        .post('/checklists')
        .send({
          building: 'Harmony Tower',
          date: 'invalid',
          status: 'Pass',
          inspector: 'John Doe',
          notes: 'All fire alarms working properly.',
        })
        .expect(400)
        .expect({
          details: { date: ['date must be a valid ISO 8601 date string'] },
          message: 'The request could not be processed.',
        });
    });
  });
});
