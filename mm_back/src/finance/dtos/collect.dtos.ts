import { CoreOutput } from '@/common/dtos/output.dto';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CollectOHLCV_DBInput {
  @IsString()
  @Field(() => String)
  code: string;

  @IsString()
  @Field(() => String)
  startDate: string;

  @IsString()
  @Field(() => String)
  endDate: string;
}

@ObjectType()
export class CollectOHLCV_DBOutput extends CoreOutput {}
