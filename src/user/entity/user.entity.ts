import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Match } from './match.entity';

export class LikertQuestions {
  closeness!: number;
  openness!: number;
  quietness!: number;
}

type Gender = 'male' | 'female' | 'other';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string | undefined;

  @Column()
  readonly firstName!: string;

  @Column()
  readonly lastName!: string;

  @Column()
  readonly gender!: Gender;

  @Column({ unique: true })
  readonly email!: string;

  @Column()
  readonly password!: string;
  
  @Column('date')
  readonly birthDate!: Date;
  
  @Column('simple-array')
  readonly interests!: string[];

  @Column('simple-array')
  readonly datingPreferences!: Gender[];

  @Column({ type: 'jsonb' })
  readonly likert!: LikertQuestions;

  @ManyToMany(() => User)
  @JoinTable()
  readonly matches: User[] | undefined;

  @Column('simple-array', { default: [] })
  readonly pastMatches: string[] | undefined;

  @OneToMany(() => Match, (match) => match.user1)
  readonly matchesInitiated: Match[] | undefined;

  @OneToMany(() => Match, (match) => match.user2)
  readonly matchesReceived: Match[] | undefined;
}
