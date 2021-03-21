import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { User } from './user.entity';

export enum Bio {
  Man = 'Man',
  Woman = 'Woman',
  NoComment = 'NoComment',
}

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class Profile extends CoreEntity {
  @Field((types) => Bio)
  @Column({ type: 'enum', enum: Bio })
  bio: Bio;

  // 투자 성향 관련 프로파일

  // relation

  @OneToOne(() => Profile, (profile) => profile.user, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;
}
