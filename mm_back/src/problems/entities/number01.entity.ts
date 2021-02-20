import { InputType, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity } from 'typeorm';

// 문제의 정답 : 객관식, 다중 객관식, 주관식 > json 저장
@InputType('AnswerInputType', { isAbstract: true })
@ObjectType()
export class Answer {
  isMultiple: boolean;

  isNumber: boolean;

  answer: number | string | number[];
}

@Entity()
export class Number01 extends CoreEntity {
  @IsString()
  @Column()
  title: string;

  @Column()
  subTitle: string;

  @Column({ type: 'json' })
  answer: Answer;
}
