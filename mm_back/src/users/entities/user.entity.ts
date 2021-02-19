import { CoreEntity } from 'src/common/entities/CoreEntity';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends CoreEntity {
  @Column({ default: '' })
  name: string;
}
