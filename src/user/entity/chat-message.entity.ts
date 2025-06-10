import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Match } from './match.entity';

@Entity()
export class ChatMessage {
  @PrimaryGeneratedColumn('uuid')
  id: string | undefined;

  @Column()
  message!: string;

  @ManyToOne(() => User)
  sender!: User;

  @ManyToOne(() => Match, (match) => match.chatMessages)
  match!: Match;

  @CreateDateColumn()
  sentAt!: Date;
}
