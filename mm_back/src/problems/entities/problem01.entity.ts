import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity } from 'typeorm';

// 문제의 정답 : 객관식, 다중 객관식, 주관식 > json 저장
@InputType('AnswerInputType', { isAbstract: true })
@ObjectType()
export class Answer {
  @Field(() => Boolean)
  isMultiple: boolean;

  @Field(() => Boolean)
  isNumber: boolean;

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

  @Column()
  @Field(() => String)
  subTitle: string;

  @Column({ type: 'json' })
  @Field(() => Answer)
  answer: Answer;
}
