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
  
  @Type(() => LikertQuestionsDto)
  @ApiProperty({ type: LikertQuestionsDto })
  likert!: LikertQuestionsDto;
  
  @ApiProperty({ type: [String], example: ['b3a77d4c-7ec9-4fd2-a3f9-a9c4e39d9b20'] })
  likedUsers!: string[];
  
  @ApiProperty({ type: [String], example: ['b3a77d4c-7ec9-4fd2-a3f9-a9c4e39d9b20'] })
  passedUsers!: string[];
  
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
    dto.likedUsers = u.likedUsers;
    dto.passedUsers = u.passedUsers;
    return dto;
  }
}
