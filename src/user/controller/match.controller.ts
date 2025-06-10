import { Body, Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { MatchResponseDto } from "../dto/matchResponse.dto";
import { ChatMessageResponseDto } from "../dto/chatMessageResponse.dto";

@ApiTags('matches')
@Controller('matches')
export class MatchController {
  constructor(private readonly userService: UserService) {}
  
  // // TODO
  // @Get(':userId')
  // @ApiResponse({ status: 200, description: 'Returns all matches for the user', type: [MatchResponseDto] })
  // async getAllMatches(@Param('userId') userId: string): Promise<MatchResponseDto[]> {
  //
  // }
  //
  // // TODO
  // @Get(':matchId')
  // @ApiResponse({ status: 200, description: 'Returns the match with matchId', type: MatchResponseDto })
  // @ApiResponse({ status: 404, description: 'Match not found' })
  // async findMatch(@Param('matchId') matchId: string): Promise<MatchResponseDto> {
  //
  // }
  //
  // // TODO
  // @Delete(':matchId')
  // @HttpCode(204)
  // @ApiResponse({ status: 204, description: 'Removes a match'})
  // @ApiResponse({ status: 404, description: 'Match not found' })
  // async unmatchUser(@Param('matchId') matchId: string): Promise<void> {
  //
  // }
  //
  //
  // // TODO
  // @Get(':matchId/chat-messages')
  // @ApiResponse({ status: 200, description: 'Returns the chat messages for the match', type: [ChatMessageResponseDto] })
  // @ApiResponse({ status: 404, description: 'Match not found' })
  // async getChatMessages(@Param('matchId') matchId: string): Promise<ChatMessageResponseDto[]> {
  //
  // }
  //
  // // TODO
  // @Post(':matchId/chat-messages')
  // @ApiResponse({ status: 201, description: 'Sends a message to the match' })
  // @ApiResponse({ status: 404, description: 'Match not found' })
  // async sendMessage(@Param('matchId') matchId: string, @Body() body: { message: string }): Promise<void> {
  //
  // }
}
