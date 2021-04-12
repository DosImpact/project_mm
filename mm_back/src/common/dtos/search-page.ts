import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class SearchPageInput {
  @IsNumber()
  @Field(() => Int, { defaultValue: 1 })
  page: number; // 반드시 존재 1 이여야함.

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  searchTerm?: string; // null일수도
}

@ObjectType()
export class SearchPageOutput {
  @Field((type) => Boolean, { defaultValue: false }) // 무의미 - Ok값은 무조건 직접 뭐야함
  ok!: boolean;

  @Field((type) => String, { nullable: true }) // 널값 출력 가능
  error?: string;

  @Field((type) => Int, { defaultValue: 1 }) // 값을 안주면 1 로 출력
  totalPage?: number;

  @Field((type) => Int, { defaultValue: 0 }) // 값을 안주면 0 으로 출력
  totalEntity?: number;
}

/*
*DB를 다 털 수 있는 findAll 요청에 대해서 고찰
eg)
Input : searchTerm, page 
	- searchTerm 을 안주면 id 순으로 20개만 주자. 
	- searchTerm을 주면... 특정 필드에서 검색해서 20개만 주자
	- (인스타그램은 계정,태그,장소 3가지 검색 제공 )
	- page는 기본값 1로 셋팅
output
	- 현재 2page/10page , 191개 게시글 존재

*/
