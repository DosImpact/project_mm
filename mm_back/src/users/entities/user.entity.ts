import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToOne } from 'typeorm';
import { Profile } from './profile.entity';
import { compare, hash, genSalt } from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class User extends CoreEntity {
  @IsString()
  @Field(() => String)
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

  @IsBoolean()
  @Field(() => Boolean)
  @Column({ default: false })
  verified: boolean;

  @OneToOne(() => Profile, (profile) => profile.user)
  profile: Profile;

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
