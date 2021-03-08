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

  @Field(() => Date)
  @DeleteDateColumn()
  deletedAt: Date; // auto log soft삭제

  @Field(() => Number)
  @VersionColumn()
  v: number; // auto log 업데이트 - 횟수
}
