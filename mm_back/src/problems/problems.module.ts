import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Problem01 } from './entities/problem01.entity';
import { ProblemsResolver } from './problems.resolver';
import { ProblemsService } from './problems.service';

@Module({
  imports: [TypeOrmModule.forFeature([Problem01])],
  providers: [ProblemsResolver, ProblemsService],
})
export class ProblemsModule {}
