import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsBoolean, IsString, ValidateNested } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity } from 'typeorm';

// 문제의 정답 : 객관식, 다중 객관식, 주관식 > json 저장
@InputType('AnswerInputType', { isAbstract: true })
@ObjectType()
export class Answer {
  @IsBoolean()
  @Field(() => Boolean)
  isMultiple: boolean;

  @IsBoolean()
  @Field(() => Boolean)
  isNumber: boolean;

  @IsString({ each: true })
  @Field(() => [String])
  answer: string[];
}

@InputType('Problem01Input', { isAbstract: true })
@ObjectType()
@Entity()
export class Problem01 extends CoreEntity {
  @IsString()
  @Column()
  @Field(() => String)
  title: string;

  @IsString()
  @Column()
  @Field(() => String, { nullable: true })
  subTitle?: string;

  @ValidateNested({ each: true })
  @Type(() => Answer)
  @Column({ type: 'json' })
  @Field(() => Answer)
  answer: Answer;

  @Field(() => Int)
  totalProblems01: number;
}
