import { Module } from '@nestjs/common';
import { ChecklistsService } from './checklists.service';
import { ChecklistsController } from './checklists.controller';
import { ChecklistRepository } from './checklists.repository';

@Module({
  providers: [ChecklistsService, ChecklistRepository],
  controllers: [ChecklistsController],
})
export class ChecklistsModule {}
