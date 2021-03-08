// 문제2 모델링- 사실상 유저 엔터티임 - 관리자,학생,선생님 타입 존재

import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { IsEmail, IsEnum, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import { compare, hash } from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';

export enum P02UserRole {
  admin = 'admin',
  student = 'student',
  teacher = 'teacher',
}

registerEnumType(P02UserRole, { name: 'P02UserRole' });

@InputType('Problem02Input', { isAbstract: true })
@ObjectType()
@Entity()
export class Problem02 extends CoreEntity {
  @IsEmail()
  @Field((types) => String)
  @Column()
  email: string;

  @IsString()
  @Field((types) => String)
  @Column()
  password: string;

  @IsEnum(P02UserRole)
  @Field((types) => P02UserRole)
  @Column({ type: 'enum', enum: P02UserRole })
  role: P02UserRole;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    try {
      this.password = await hash(this.password, 10);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
  async checkPassword(plainPassword: string) {
    try {
      return compare(plainPassword, this.password);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
