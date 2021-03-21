import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, OneToOne } from 'typeorm';
import { Profile } from './profile.entity';

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class User extends CoreEntity {
  @IsString()
  @Field(() => String)
  @Column({ default: '' })
  username: string;

  @IsString()
  @Field(() => String)
  @Column({ unique: true, nullable: true })
  email: string;

  @OneToOne(() => Profile, (profile) => profile.user)
  profile: Profile;
}
