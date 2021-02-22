import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateProblem01Input,
  CreateProblem01Output,
} from './dtos/create-problem01.dto';
import { DeleteProblem01Input } from './dtos/delete-problem01.dto';
import { Problem01Input, Problem01Output } from './dtos/problem01.dto';
import { Problems01Output } from './dtos/problems01.dto';
import {
  UpdateProblem01Output,
  UpdateProblem01Input,
} from './dtos/update-problem01.dto';
import { Problem01 } from './entities/problem01.entity';

/**
 * ✅ @param read1
 * @param readn
 * @param readn_page
 * @param create
 * @param update
 * @param softdelete
 */

const logger = new Logger('ProblemsService');

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

  async getProblems01(): Promise<Problems01Output> {
    try {
      const problems = await this.problem01Repo.find();
      return { ok: true, problems01: problems };
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

  async updateProblem01({
    answer,
    id,
    title,
    subTitle,
  }: UpdateProblem01Input): Promise<UpdateProblem01Output> {
    try {
      const problem = await this.problem01Repo.findOneOrFail(id);
      console.log(problem);
      if (answer) problem.answer = answer;
      if (title) problem.title = title;
      if (subTitle) problem.subTitle = subTitle;

      const updatedProblem = await this.problem01Repo.save(problem);
      logger.debug(updatedProblem);
      return {
        ok: true,
        problem01: problem,
      };
    } catch (error) {
      return {
        error: 'cannot find problem',
        ok: false,
      };
    }
  }

  async deleteProblem01({ id }: DeleteProblem01Input) {
    try {
      await this.problem01Repo.findOneOrFail(id);
      // await this.problem01Repo.delete(id);  // real delete
      await this.problem01Repo.softRemove({ id });
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'cannot delete',
      };
    }
  }
}
