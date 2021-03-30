import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './note.entity';
import { NoteSerivce } from './note.service';
import { NUser } from './nuser.entity';
import { SharedNote } from './sharedNote.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Note, NUser, SharedNote])],
  providers: [NoteSerivce],
})
export class NoteModule {}
