import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ChatMessage } from './chat-message.entity';
import { User } from './user.entity';

@Entity()
export class Match {
  @PrimaryGeneratedColumn('uuid')
  id: string | undefined;

  @ManyToOne(() => User, (user) => user.matchesInitiated)
  user1!: User;

  @ManyToOne(() => User, (user) => user.matchesReceived)
  user2!: User;

  @OneToMany(() => ChatMessage, (message) => message.match, {
    cascade: true,
  })
  chatMessages: ChatMessage[] | undefined;

  @Column('timestamp with time zone')
  matchedAt: Date | undefined;
}
