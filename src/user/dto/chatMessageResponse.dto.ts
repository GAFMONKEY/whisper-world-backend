import { ApiProperty } from '@nestjs/swagger';
import { ChatMessage } from '../entity/chat-message.entity';

export class ChatMessageResponseDto {
  @ApiProperty({ example: 'b3a77d4c-7ec9-4fd2-a3f9-a9c4e39d9b20' })
  id: string;

  @ApiProperty({ example: 'Hey, how are you?' })
  message: string;

  @ApiProperty({ example: '51b8a4ad-1c38-4f3d-9982-7d376d6d4990' })
  senderId: string;

  @ApiProperty({ example: '5585cf63-19b2-4c84-8b3c-5e7c925e9791' })
  matchId: string;

  @ApiProperty({ example: '2025-06-10T09:15:00.000Z' })
  sentAt: Date;
  
  type: string;
  
  audioDuration?: number;

  static fromEntity(entity: ChatMessage): ChatMessageResponseDto {
    const dto = new ChatMessageResponseDto();

    dto.id = entity.id!;
    dto.message = entity.message;
    dto.senderId = entity.sender?.id!;
    dto.matchId = entity.match?.id!;
    dto.sentAt = entity.sentAt;
    dto.type = entity.type;
    dto.audioDuration = entity.audioDuration;

    return dto;
  }
}
