import { ApiProperty } from '@nestjs/swagger';
import { User } from "../entity/user.entity";
import { Type } from "@nestjs/class-transformer";

export class LikertQuestionsDto {
  @ApiProperty({ example: 5 })
  closeness!: number;
  
  @ApiProperty({ example: 3 })
  openness!: number;
  
  @ApiProperty({ example: 2 })
  quietness!: number;
}

export class UserResponseDto {
  @ApiProperty({ example: 'b6f3e519-a1f4-489a-bd54-6e6db33e2e29' })
  id!: string;
  
  @ApiProperty({ example: 'Alice' })
  firstName!: string;
  
  @ApiProperty({ example: 'Anderson' })
  lastName!: string;
  
  @ApiProperty({ example: 'female' })
  gender!: 'male' | 'female' | 'other';
  
  @ApiProperty({ example: 'alice.anderson@example.com' })
  email!: string;
  
  @ApiProperty({ type: String, format: 'date', example: '1990-12-10' })
  birthDate!: Date;
  

  @ApiProperty({ type: [String], example: ['reading', 'hiking'] })
  interests!: string[];
  
  @ApiProperty({ type: [String], enum: ['male', 'female', 'other'] })
  datingPreferences!: ('male' | 'female' | 'other')[];
  
  @ApiProperty({ type: [String], description: 'UUIDs of current matches' })
  matches!: string[];
  
  @ApiProperty({ type: [String], description: 'UUIDs of past matches' })
  pastMatches!: string[];
  
  @Type(() => LikertQuestionsDto)
  @ApiProperty({ type: LikertQuestionsDto })
  likert!: LikertQuestionsDto;
  
  static fromEntity(u: User): UserResponseDto {
    const dto = new UserResponseDto();
    dto.id = u.id!;
    dto.firstName = u.firstName;
    dto.lastName = u.lastName;
    dto.gender = u.gender;
    dto.email = u.email;
    dto.birthDate = u.birthDate;
    dto.interests = u.interests;
    dto.datingPreferences = u.datingPreferences;
    dto.likert = u.likert as LikertQuestionsDto;
    dto.matches = u.matches?.map(m => m.id!) ?? [];
    dto.pastMatches = u.pastMatches ?? [];
    return dto;
  }
}
