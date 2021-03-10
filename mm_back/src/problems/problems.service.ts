import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CheckProblem01Input,
  CheckProblem01Output,
} from './dtos/p01/check-problem01.dto';
import {
  CreateProblem01Input,
  CreateProblem01Output,
} from './dtos/p01/create-problem01.dto';
import { DeleteProblem01Input } from './dtos/p01/delete-problem01.dto';
import { Problem01Input, Problem01Output } from './dtos/p01/problem01.dto';
import { Problems01Output } from './dtos/p01/problems01.dto';
import {
  UpdateProblem01Output,
  UpdateProblem01Input,
} from './dtos/p01/update-problem01.dto';
import { CreateProblem02Input } from './dtos/p02/create-p02.dto';
import { Problem02Input, Problem02Output } from './dtos/p02/p02.dto';
import { Problems02Input, Problems02Output } from './dtos/p02/ps02.dto';
import {
  UpdateProblem02Input,
  UpdateProblem02Output,
} from './dtos/p02/update-p02.dto';
import {
  DeleteProblem02Input,
  DeleteProblem02Output,
} from './dtos/p02/delete-p02.dto';
import { Problem01 } from './entities/problem01.entity';
import { Problem02 } from './entities/problem02.entity';
import {
  LoginProblem02Input,
  LoginProblem02Output,
} from './dtos/p02/login-p02.dto';
import { JwtService } from 'src/jwt/jwt.service';

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
    @InjectRepository(Problem02)
    private readonly problem02Repo: Repository<Problem02>,
    private readonly jwtService: JwtService,
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
      // console.log(problem);
      if (answer) problem.answer = answer;
      if (title) problem.title = title;
      if (subTitle) problem.subTitle = subTitle;
      await this.problem01Repo.save(problem);
      // const updatedProblem = await this.problem01Repo.save(problem);
      // logger.debug(updatedProblem);
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

  async checkProblem01({
    id,
    answer: uAnswer,
  }: CheckProblem01Input): Promise<CheckProblem01Output> {
    try {
      const { answer: cAnswer } = await this.problem01Repo.findOneOrFail(id);
      if (uAnswer.length !== cAnswer.answer.length) {
        return {
          ok: true,
          isCorrect: false,
        };
      } else {
        for (const [i, cAns] of cAnswer.answer.entries()) {
          if (uAnswer[i] !== cAns) {
            return {
              ok: true,
              isCorrect: false,
            };
          }
        }
        return {
          ok: true,
          isCorrect: true,
        };
      }
    } catch (error) {
      logger.error(error);
      return {
        ok: false,
        error: `cannot checkProblem01 with id ${id}`,
      };
    }
  }

  async countProblem01(): Promise<number> {
    return this.problem01Repo.count({});
  }
  // --- problem02

  async getProblem02({ id }: Problem02Input): Promise<Problem02Output> {
    try {
      const problem02 = await this.problem02Repo.findOneOrFail(id);
      return {
        problem02,
        ok: true,
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        error: 'cannot find problem02',
      };
    }
  }
  async getProblems02(): Promise<Problems02Output> {
    try {
      const problems02 = await this.problem02Repo.find({});
      return {
        ok: true,
        problems02,
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        error: 'cannot find problem 02',
        problems02: [],
      };
    }
  }
  async createProblem02({
    email,
    password,
    role,
  }: CreateProblem02Input): Promise<CreateProblem01Output> {
    try {
      await this.problem02Repo.save(
        this.problem02Repo.create({ email, password, role }),
      );
      return {
        ok: true,
      };
    } catch (error) {
      console.log(error);
      return {
        ok: true,
        error: 'cannot createProblem02',
      };
    }
  }
  async updateProblem02({
    id,
    email,
    password,
    role,
  }: UpdateProblem02Input): Promise<UpdateProblem02Output> {
    try {
      const problem02 = await this.problem02Repo.findOneOrFail(id);
      if (email) problem02.email = email;
      if (password) problem02.password = password;
      if (role) problem02.role = role;
      await this.problem02Repo.save(problem02);
      return {
        ok: true,
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        error: 'cannot find problem02',
      };
    }
  }
  async deleteProblem02({
    id,
  }: DeleteProblem02Input): Promise<DeleteProblem02Output> {
    try {
      const problem02 = await this.problem02Repo.findOneOrFail(id);
      await this.problem02Repo.softRemove({ id: problem02.id });
    } catch (error) {
      return {
        ok: false,
        error: 'cannot delete',
      };
    }
  }

  async loginProblem02({
    email,
    password,
  }: LoginProblem02Input): Promise<LoginProblem02Output> {
    try {
      const problem02 = await this.problem02Repo.findOneOrFail({ email });
      const correct = await problem02.checkPassword(password);
      if (correct) {
        const token = this.jwtService.sign({ id: problem02.id });
        return {
          ok: true,
          token,
        };
      } else {
        return {
          ok: false,
          error: 'wrong password',
        };
      }
    } catch (error) {
      return {
        ok: false,
        error: 'cannot find enrolled email',
      };
    }
  }
}
