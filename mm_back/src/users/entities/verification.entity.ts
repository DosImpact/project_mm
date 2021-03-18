import { CoreEntity } from 'src/common/entities/core.entity';
import { Entity, JoinColumn, OneToOne } from 'typeorm';
import { User } from './user.entity';

// API 입출력으로 나오지 않으므로 모델링만!

@Entity()
export class Verification extends CoreEntity {
  @OneToOne((type) => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;
}
