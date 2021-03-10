import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Problem01 } from './entities/problem01.entity';
import { Problem02 } from './entities/problem02.entity';
import {
  Problem01Controller,
  Problem02Controller,
} from './problems.controller';
import { Problem01Resolver, Problem02Resolver } from './problems.resolver';
import { ProblemsService } from './problems.service';

@Module({
  imports: [TypeOrmModule.forFeature([Problem01, Problem02])],
  providers: [Problem01Resolver, Problem02Resolver, ProblemsService],
  controllers: [Problem01Controller, Problem02Controller],
})
export class ProblemsModule {}
