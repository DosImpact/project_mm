import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateProblem01Input,
  CreateProblem01Output,
} from './dtos/create-problem01.dto';
import { Problem01Input, Problem01Output } from './dtos/problem01.dto';
import { Problem01 } from './entities/problem01.entity';

/**
 * ✅ @param read1
 * @param readn
 * @param readn_page
 * @param create
 * @param update
 * @param softdelete
 */

@Injectable()
export class ProblemsService {
  constructor(
    @InjectRepository(Problem01)
    private readonly problem01Repo: Repository<Problem01>,
  ) {}

  async getProblem01({ id }: Problem01Input): Promise<Problem01Output> {
    try {
      const problem = await this.problem01Repo.findOneOrFail(id);
      return { ok: true, problem01: problem };
    } catch (error) {
      return { ok: false, error: 'cannot get Problem01' };
    }
  }

  async createProblem01({
    answer,
    subTitle,
    title,
  }: CreateProblem01Input): Promise<CreateProblem01Output> {
    try {
      this.problem01Repo.save(
        this.problem01Repo.create({ answer, subTitle, title }),
      );
    } catch (error) {
      return { ok: false, error: 'cannot createProblem01 ' };
    }
    return { ok: true };
  }
}
