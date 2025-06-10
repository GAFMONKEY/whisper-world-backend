import { ApiProperty } from '@nestjs/swagger';
import { ChatMessageResponseDto } from "./chatMessageResponse.dto";
import { Match } from "../entity/match.entity";

export class MatchResponseDto {
  @ApiProperty({ example: '9e9fe3ef-7137-459a-832c-3b8e9a0f4f23' })
  id: string;
  
  @ApiProperty({ example: '51b8a4ad-1c38-4f3d-9982-7d376d6d4990' })
  user1Id: string;
  
  @ApiProperty({ example: '86c5ac37-2a07-4ca8-b08d-7ce2753ea3b7' })
  user2Id: string;
  
  @ApiProperty({ type: () => [ChatMessageResponseDto], required: false })
  chatMessages?: ChatMessageResponseDto[];
  
  @ApiProperty({ example: '2025-06-10T09:00:00.000Z' })
  matchedAt: Date;
  
  static fromEntity(
    entity: Match,
    includeMessages = false,
  ): MatchResponseDto {
    const dto = new MatchResponseDto();
    
    dto.id       = entity.id!;
    dto.user1Id  = entity.user1?.id!;
    dto.user2Id  = entity.user2?.id!;
    dto.matchedAt = entity.matchedAt!;
    
    if (includeMessages && entity.chatMessages) {
      dto.chatMessages = entity.chatMessages.map(ChatMessageResponseDto.fromEntity);
    }
    
    return dto;
  }
}
