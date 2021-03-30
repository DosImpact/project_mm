import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Note } from './note.entity';
import { SharedNote } from './sharedNote.entity';

@Entity()
export class NUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  // 여러개의 노트를 가진다.
  @OneToMany(() => Note, (note) => note.owner)
  notes: Note[];

  // 여러개의 노트를 공유받음
  @ManyToOne(() => SharedNote, (sharedNote) => sharedNote.target)
  notesSharedWithYou: Note[];

  // 여러개의 노트를 공유함
  @ManyToOne(() => SharedNote, (sharedNote) => sharedNote.sender)
  notesYouShared: Note[];
}
