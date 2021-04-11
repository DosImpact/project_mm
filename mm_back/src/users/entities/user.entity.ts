import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { IsBoolean, IsEnum, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Profile } from './profile.entity';
import { compare, hash, genSalt } from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';
import { PyTask } from '@/pyshell/entities/py-task.dto';

export enum UserRole {
  Admin = 'Admin',
  Sliver = 'Sliver',
  Gold = 'Gold',
  Platinum = 'Platinum',
  Diamond = 'Diamon',
  Ruby = 'Ruby',
}

registerEnumType(UserRole, { name: 'UserRole' });

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class User extends CoreEntity {
  @IsString()
  @Field(() => String, { nullable: true })
  @Column({ default: '', nullable: true })
  username: string;

  @IsString()
  @Field(() => String)
  @Column({ unique: true })
  email: string;

  @IsString()
  @Field(() => String)
  @Column()
  password: string;

  @IsEnum(UserRole)
  @Field(() => UserRole)
  @Column({ type: 'enum', enum: UserRole, default: UserRole.Sliver })
  role: UserRole;

  @IsBoolean()
  @Field(() => Boolean)
  @Column({ default: false })
  verified: boolean;

  //relation part
  // 한명의 유저는 하나의 프로필을 갖는다.
  @Field(() => Profile)
  @OneToOne(() => Profile, (profile) => profile.user)
  profile: Profile;

  // 한명의 유저는 요청한 여러 작업결과를 갖는다.
  @Field(() => [PyTask], { nullable: true })
  @OneToMany(() => PyTask, (pyTask) => pyTask.user)
  pyTasks: PyTask[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    try {
      if (this.password) {
        const salt = await genSalt();
        this.password = await hash(this.password, salt);
      }
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async checkPassword(plainPassword: string) {
    return compare(plainPassword, this.password);
  }
}
