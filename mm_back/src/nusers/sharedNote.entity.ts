import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Note } from './note.entity';
import { NUser } from './nuser.entity';

@Entity()
export class SharedNote {
  @PrimaryColumn()
  targetId: number;
  @ManyToOne(() => NUser, (nuser) => nuser.notesSharedWithYou)
  @JoinColumn({ name: 'targetId' })
  target: NUser;

  @PrimaryColumn()
  senderId: number;
  @ManyToOne(() => NUser, (nuser) => nuser.notesYouShared)
  @JoinColumn({ name: 'senderId' })
  sender: NUser;

  @PrimaryColumn()
  noteId: number;
  @ManyToOne(() => Note, (note) => note.shares)
  @JoinColumn({ name: 'noteId' })
  note: Note;
}
