import { CoreOutput } from '@/common/dtos/output.dto';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { OHLCV } from '../entities/OHLCV.entity';

@InputType()
export class OHLCVByCodeInput {
  @Field(() => String)
  @IsString()
  code: string;
}

@ObjectType()
export class OHLCVByCodeOutput extends CoreOutput {
  @Field(() => [OHLCV], { nullable: true })
  OHLCVs?: OHLCV[];

  @Field(() => Int, { nullable: true })
  OHLCV_count?: number;
}
