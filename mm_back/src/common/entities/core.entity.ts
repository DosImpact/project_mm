import { Field, ObjectType } from '@nestjs/graphql';
import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class CoreEntity {
  @Field(() => Number)
  @PrimaryGeneratedColumn()
  id!: number; // auto increment id

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date; // auto log 생성일

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date; // auto log 업데이트 일자

  // 주의 ! : 삭제된 날짜는 처음에는 null 값이다.
  @Field(() => Date, { nullable: true })
  @DeleteDateColumn()
  deletedAt?: Date; // auto log soft삭제

  @Field(() => Number)
  @VersionColumn()
  v: number; // auto log 업데이트 - 횟수
}
