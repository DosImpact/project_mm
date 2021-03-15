import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PyShellService } from 'src/pyshell/py-shell.service';
import { Problem01 } from './entities/problem01.entity';
import { Problem02 } from './entities/problem02.entity';
import {
  Problem01Controller,
  Problem02Controller,
} from './problems.controller';
import {
  Problem01Resolver,
  Problem02Resolver,
  Problem03Resolver,
} from './problems.resolver';
import { ProblemsService } from './problems.service';

@Module({
  imports: [TypeOrmModule.forFeature([Problem01, Problem02])],
  providers: [
    ProblemsService,
    Problem01Resolver,
    Problem02Resolver,
    Problem03Resolver,
  ],
  controllers: [Problem01Controller, Problem02Controller],
  exports: [ProblemsService],
})
export class ProblemsModule {}
