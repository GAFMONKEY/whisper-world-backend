import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Match } from './match.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

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

  @Column('simple-array', { default: [] })
  likedUsers!: string[];

  @Column('simple-array', { default: [] })
  passedUsers!: string[];

  @Column('jsonb', { default: [] })
  answers!: Answer[];

  @Column('simple-array', { default: [] })
  readonly intentions!: Intentions[];

  @Column('jsonb')
  readonly lifestyle!: Lifestyle;

  @Column()
  readonly accentColor!: string; // hexcode of a color

  @OneToMany(() => Match, (match) => match.user1)
  readonly matchesInitiated: Match[] | undefined;

  @OneToMany(() => Match, (match) => match.user2)
  readonly matchesReceived: Match[] | undefined;
}

export type Gender = 'male' | 'female' | 'non-binary';
export type Intentions =
  | 'friends'
  | 'hookups'
  | 'casual dating'
  | 'open to anything'
  | 'short-term relationship'
  | 'long-term relationship';
export type YesNo = 'yes' | 'no';
export type YesNoSometimes = YesNo | 'sometimes';
export type Politics =
  | 'left'
  | 'right'
  | 'center'
  | 'not political'
  | 'not specified';
export type YesNoMaybe = 'yes' | 'no' | 'maybe';
export type YesNoNotspecified = YesNo | 'not specified';
export type LikertQuestions = {
  closeness: number;
  openness: number;
  quietness: number;
};
export type Lifestyle = {
  childrenWish: YesNoMaybe;
  children: YesNo;
  alcohol: YesNoSometimes;
  smoking: YesNoSometimes;
  cannabis: YesNoSometimes;
  politics: Politics
};
export type Answer = {
  cluster: string;
  question: string;
  textAnswer?: string;
  audioUrl?: string;
};
