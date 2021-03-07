import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Problem01 } from '../../entities/problem01.entity';

@InputType()
export class CreateProblem01Input extends PickType(Problem01, [
  'title',
  'subTitle',
  'answer',
]) {}

@ObjectType()
export class CreateProblem01Output extends CoreOutput {}
