import { CoreOutput } from '@/common/dtos/output.dto';
import { InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class CreateBannerInput {}

@ObjectType()
export class CreateBannerOutput extends CoreOutput {}
