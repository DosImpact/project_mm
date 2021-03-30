import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { NUser } from './nuser.entity';
import { SharedNote } from './sharedNote.entity';

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  // 한명의 사용자를 가진다.
  @Column()
  ownerId: number;
  @ManyToOne(() => NUser, (user) => user.notes)
  @JoinColumn({ name: 'ownerId' })
  owner: NUser;

  // 여러개의 공유 talbe를 가진다. *
  @OneToMany(() => SharedNote, (sharedNote) => sharedNote.note)
  shares: SharedNote[];
}
