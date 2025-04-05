import { NestFactory } from '@nestjs/core';
import { ChecklistsModule } from './checklists/checklists.module';

async function bootstrap() {
  const app = await NestFactory.create(ChecklistsModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
