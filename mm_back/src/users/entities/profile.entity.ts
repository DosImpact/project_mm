import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { IsEnum } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { User } from './user.entity';

export enum Bio {
  Man = 'Man',
  Woman = 'Woman',
  NoComment = 'NoComment',
}

registerEnumType(Bio, { name: 'Bio' });

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class Profile extends CoreEntity {
  @IsEnum(Bio)
  @Field((types) => Bio)
  @Column({ type: 'enum', enum: Bio, default: Bio.NoComment })
  bio: Bio;

  // 투자 성향 관련 프로파일

  // relation

  @OneToOne(() => Profile, (profile) => profile.user, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;
}
