import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsArray, IsDateString, IsIn, IsObject, ValidateNested, IsOptional, IsHexColor, ArrayNotEmpty, IsNumber, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { Gender, Intentions, YesNo, YesNoSometimes, Politics, YesNoMaybe, LikertQuestions, Lifestyle, Answer } from '../entity/user.entity';

class LikertQuestionsDto implements LikertQuestions {
  @ApiProperty({ description: 'Closeness score (1-7)', minimum: 1, maximum: 7 })
  @IsNumber()
  @Min(1)
  @Max(7)
  closeness!: number;
  
  @ApiProperty({ description: 'Openness score (1-7)', minimum: 1, maximum: 7 })
  @IsNumber()
  @Min(1)
  @Max(7)
  openness!: number;
  
  @ApiProperty({ description: 'Quietness score (1-7)', minimum: 1, maximum: 7 })
  @IsNumber()
  @Min(1)
  @Max(7)
  quietness!: number;
}

class LifestyleDto implements Lifestyle {
  @ApiProperty({ description: 'Wish to have children', enum: ['yes', 'no', 'maybe'] })
  @IsIn(['yes', 'no', 'maybe'])
  childrenWish!: YesNoMaybe;
  
  @ApiProperty({ description: 'Has children', enum: ['yes', 'no'] })
  @IsIn(['yes', 'no'])
  children!: YesNo;
  
  @ApiProperty({ description: 'Alcohol consumption', enum: ['yes', 'no', 'sometimes'] })
  @IsIn(['yes', 'no', 'sometimes'])
  alcohol!: YesNoSometimes;
  
  @ApiProperty({ description: 'Smoking habits', enum: ['yes', 'no', 'sometimes'] })
  @IsIn(['yes', 'no', 'sometimes'])
  smoking!: YesNoSometimes;
  
  @ApiProperty({ description: 'Cannabis usage', enum: ['yes', 'no', 'sometimes'] })
  @IsIn(['yes', 'no', 'sometimes'])
  cannabis!: YesNoSometimes;
  
  @ApiProperty({ description: 'Political orientation', enum: ['left', 'right', 'center', 'not political', 'not specified'] })
  @IsIn(['left', 'right', 'center', 'not political', 'not specified'])
  politics!: Politics;
}

class AnswerDto implements Answer {
  @ApiProperty({ description: 'Answer cluster/category' })
  @IsString()
  @IsNotEmpty()
  cluster!: string;
  
  @ApiProperty({ description: 'The question being answered' })
  @IsString()
  @IsNotEmpty()
  question!: string;
  
  @ApiProperty({ description: 'Text answer', required: false })
  @IsOptional()
  @IsString()
  textAnswer?: string;
  
  @ApiProperty({ description: 'Audio answer URL', required: false })
  @IsOptional()
  @IsString()
  audioUrl?: string;
}

export class UserCreateDTO {
  @ApiProperty({ description: 'First name' })
  @IsString()
  @IsNotEmpty()
  firstName!: string;
  
  @ApiProperty({ description: 'Last name' })
  @IsString()
  @IsNotEmpty()
  lastName!: string;
  
  @ApiProperty({ description: 'Gender', enum: ['male', 'female', 'non-binary'] })
  @IsIn(['male', 'female', 'non-binary'])
  gender!: Gender;
  
  @ApiProperty({ description: 'Email address' })
  @IsEmail()
  email!: string;
  
  @ApiProperty({ description: 'Password' })
  @IsString()
  @IsNotEmpty()
  password!: string;
  
  @ApiProperty({ description: 'Birth date (ISO string)', example: '1995-06-15' })
  @IsDateString()
  birthDate!: string;
  
  @ApiProperty({ description: 'Array of interests', type: [String] })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  interests!: string[];
  
  @ApiProperty({
    description: 'Dating preferences (genders)',
    type: [String],
    enum: ['male', 'female', 'non-binary'],
    isArray: true
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsIn(['male', 'female', 'non-binary'], { each: true })
  datingPreferences!: Gender[];
  
  @ApiProperty({ description: 'Likert scale questionnaire responses', type: LikertQuestionsDto })
  @IsObject()
  @ValidateNested()
  @Type(() => LikertQuestionsDto)
  likert!: LikertQuestionsDto;
  
  @ApiProperty({
    description: 'Dating intentions',
    type: [String],
    enum: ['friends', 'hookups', 'casual dating', 'open to anything', 'short-term relationship', 'long-term relationship'],
    isArray: true
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsIn(['friends', 'hookups', 'casual dating', 'open to anything', 'short-term relationship', 'long-term relationship'], { each: true })
  intentions!: Intentions[];
  
  @ApiProperty({ description: 'Lifestyle preferences', type: LifestyleDto })
  @IsObject()
  @ValidateNested()
  @Type(() => LifestyleDto)
  lifestyle!: LifestyleDto;
  
  @ApiProperty({ description: 'Accent color (hex code)', example: '#FF5733' })
  @IsHexColor()
  accentColor!: string;
  
  @ApiProperty({ description: 'User answers to questions', type: [AnswerDto], required: false })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswerDto)
  answers?: AnswerDto[];
}