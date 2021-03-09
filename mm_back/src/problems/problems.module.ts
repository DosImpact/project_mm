import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Problem01 } from './entities/problem01.entity';
import { Problem02 } from './entities/problem02.entity';
import { ProblemsController } from './problems.controller';
import { ProblemsResolver } from './problems.resolver';
import { ProblemsService } from './problems.service';

@Module({
  imports: [TypeOrmModule.forFeature([Problem01, Problem02])],
  providers: [ProblemsResolver, ProblemsService],
  controllers: [ProblemsController],
})
export class ProblemsModule {}
