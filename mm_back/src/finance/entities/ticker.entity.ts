import { CoreEntity } from '@/common/entities/core.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { Column, Entity } from 'typeorm';

@InputType('TickerInput', { isAbstract: true })
@Entity()
@ObjectType()
export class Ticker extends CoreEntity {
  @IsString()
  @Column()
  @Field(() => String)
  symbol: string;

  @IsString()
  @Column()
  @Field(() => String)
  name: string;

  @IsString()
  @Column()
  @Field(() => String)
  sector: string;

  @IsString()
  @Column()
  @Field(() => String)
  industry: string;
}
