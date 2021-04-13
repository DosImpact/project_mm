import { CoreOutput } from '@/common/dtos/output.dto';
import { InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class CollectOHLCV_DBInput {
  code: string;
  startDate: string;
  endDate: string;
}

@ObjectType()
export class CollectOHLCV_DBOutput extends CoreOutput {}
