import { CoreEntity } from '@/common/entities/core.entity';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsOptional } from 'class-validator';
import { Column, Entity } from 'typeorm';

@InputType('OHLCVLInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class OHLCVL extends CoreEntity {
  @IsNumber()
  @IsOptional()
  @Column({ nullable: true })
  @Field(() => Int, { nullable: true })
  date?: number;

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
  @Column({ nullable: true })
  @Field(() => Int, { nullable: true })
  Change?: number;
}
