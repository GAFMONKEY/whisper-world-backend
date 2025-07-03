import { ApiProperty } from '@nestjs/swagger';

export class ChatMessageDto {
  @ApiProperty({ example: '00000000-0000-0000-0000-000000000000' })
  sender: string;
  
  @ApiProperty({ example: 'Hello :)' })
  message: string;
  
  @ApiProperty({ example: 'VOICE or TEXT'  })
  type: string;
  
  audioDuration?: number;
}