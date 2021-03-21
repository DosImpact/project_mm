import { InputType, ObjectType } from '@nestjs/graphql';
import { Entity } from 'typeorm';
import { CoreEntity } from '../../common/entities/core.entity';

@Entity()
@InputType({ isAbstract: true })
@ObjectType()
export class HomeBanner extends CoreEntity {}
