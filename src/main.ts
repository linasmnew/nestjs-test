import { NestFactory } from '@nestjs/core';
import { ChecklistsModule } from './checklists/checklists.module';
import { ValidationPipe } from '@nestjs/common';
import BadRequestError from './exceptions/bad-request.exception';
import HttpExceptionFilter from './exceptions/filters/http-exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(ChecklistsModule);

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

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch((err) => {
  console.error('Error starting NestJS application:', err);
  process.exit(1);
});
