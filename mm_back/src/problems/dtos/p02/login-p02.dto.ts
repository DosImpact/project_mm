import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class LoginProblem02Input {
  @IsEmail()
  @Field((types) => String)
  email: string;

  @IsString()
  @Field((types) => String)
  password: string;
}

@ObjectType()
export class LoginProblem02Output extends CoreOutput {
  @IsString()
  @Field((types) => String, { nullable: true })
  token?: string;
}
