import { CoreEntity } from '@/common/entities/core.entity';
import { User } from '@/users/entities/user.entity';
import {
  Field,
  InputType,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { IsEnum, IsString } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

export enum PyTaskStatus {
  Wait = 'Wait',
  Progress = 'Progress',
  Finish = 'finish',
  Error = 'Error',
}

registerEnumType(PyTaskStatus, { name: 'PyTaskStatus' });

@InputType('PyTaskInput', { isAbstract: true })
@ObjectType()
@Entity()
export class PyTask extends CoreEntity {
  @Field(() => Int)
  @Column()
  userId: number;

  // 어떤 유저가, 어떤 task를 실행하고, 실행 상태를 알아야한, result = json객체
  @ManyToOne(() => User, (user) => user.pyTasks)
  @JoinColumn({ name: 'userId' })
  user: User;

  @IsEnum(PyTaskStatus)
  @Field(() => PyTaskStatus)
  @Column({ type: 'enum', enum: PyTaskStatus, default: PyTaskStatus.Wait })
  taskStatus: PyTaskStatus;

  @IsString()
  @Field(() => String, { nullable: true })
  @Column()
  outputs: string;
}
