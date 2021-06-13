import { Field, Float, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@InputType('SP500OHLCVInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class SP500OHLCV {
  // 복합키 구성 코드와날짜로 - 005930 + 20210403
  @IsNumber()
  @Field(() => String)
  @PrimaryColumn()
  code: string;

  @IsNumber()
  @Field(() => Int)
  @PrimaryColumn()
  date: number;

  // SP500OHLCV +C 데이터

  @IsNumber()
  @IsOptional()
  @Column({ nullable: true })
  @Field(() => Int, { nullable: true })
  Open?: number;

  @IsNumber()
  @IsOptional()
  @Column({ nullable: true })
  @Field(() => Int, { nullable: true })
  High?: number;

  @IsNumber()
  @IsOptional()
  @Column({ nullable: true })
  @Field(() => Int, { nullable: true })
  Low?: number;

  @IsNumber()
  @IsOptional()
  @Column({ nullable: true })
  @Field(() => Int, { nullable: true })
  Close?: number;

  @IsNumber()
  @IsOptional()
  @Column({ nullable: true })
  @Field(() => Int, { nullable: true })
  Volume?: number;

  @IsNumber()
  @IsOptional()
  @Column({ type: 'float', nullable: true })
  @Field(() => Float, { nullable: true })
  Change?: number;

  @IsNumber()
  @IsOptional()
  @Column({ type: 'float', nullable: true })
  @Field(() => Float, { nullable: true })
  SMA_3?: number;

  @IsNumber()
  @IsOptional()
  @Column({ type: 'float', nullable: true })
  @Field(() => Float, { nullable: true })
  SMA_5?: number;

  @IsNumber()
  @IsOptional()
  @Column({ type: 'float', nullable: true })
  @Field(() => Float, { nullable: true })
  SMA_10?: number;

  @IsNumber()
  @IsOptional()
  @Column({ type: 'float', nullable: true })
  @Field(() => Float, { nullable: true })
  SMA_20?: number;

  @IsNumber()
  @IsOptional()
  @Column({ type: 'float', nullable: true })
  @Field(() => Float, { nullable: true })
  MMT?: number;

  @IsNumber()
  @IsOptional()
  @Column({ type: 'float', nullable: true })
  @Field(() => Float, { nullable: true })
  MMT_TARGE?: number;

  // 메타데이터 확인

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date; // auto log 생성일

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date; // auto log 업데이트 일자

  @Field(() => Date, { nullable: true })
  @DeleteDateColumn()
  deletedAt?: Date; // auto log soft삭제

  @Field(() => Number)
  @VersionColumn()
  v: number; // auto log 업데이트 - 횟수
}

// @InputType('SP500OHLCVInputType', { isAbstract: true })
// @ObjectType()
// @Entity()
// export class SP500OHLCV extends CoreEntity {
//   @IsNumber()
//   @IsOptional()
//   @Column({ nullable: true })
//   @Field(() => Int, { nullable: true })
//   code?: number;

//   @IsDate()
//   @IsOptional()
//   @Column({ nullable: true })
//   @Field(() => Date, { nullable: true })
//   date?: Date;

//   @IsNumber()
//   @IsOptional()
//   @Column({ nullable: true })
//   @Field(() => Int, { nullable: true })
//   Open?: number;

//   @IsNumber()
//   @IsOptional()
//   @Column({ nullable: true })
//   @Field(() => Int, { nullable: true })
//   High?: number;

//   @IsNumber()
//   @IsOptional()
//   @Column({ nullable: true })
//   @Field(() => Int, { nullable: true })
//   Low?: number;

//   @IsNumber()
//   @IsOptional()
//   @Column({ nullable: true })
//   @Field(() => Int, { nullable: true })
//   Close?: number;

//   @IsNumber()
//   @IsOptional()
//   @Column({ nullable: true })
//   @Field(() => Int, { nullable: true })
//   Volume?: number;

//   @IsNumber()
//   @IsOptional()
//   @Column({ type: 'float', nullable: true })
//   @Field(() => Float, { nullable: true })
//   Change?: number;
// }
