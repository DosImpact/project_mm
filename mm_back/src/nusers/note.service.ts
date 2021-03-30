import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './note.entity';
import { NUser } from './nuser.entity';
import { SharedNote } from './sharedNote.entity';

@Injectable()
export class NoteSerivce {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepo: Repository<Note>,
    @InjectRepository(SharedNote)
    private readonly sharedNoteRepo: Repository<SharedNote>,
    @InjectRepository(NUser)
    private readonly nUserRepo: Repository<NUser>,
  ) {
    const init = async () => {
      const u1 = await nUserRepo.save(nUserRepo.create({ username: 'bob' }));
      console.log(u1);
    };
    init();
  }
}
