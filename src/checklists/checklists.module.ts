import { Module } from '@nestjs/common';
import { ChecklistsService } from './checklists.service';
import { ChecklistsController } from './checklists.controller';
import { Checklist } from './entities/checklist.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Checklist])],
  providers: [ChecklistsService],
  controllers: [ChecklistsController],
})
export class ChecklistsModule {}
