import { Body, Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MatchResponseDto } from "../dto/matchResponse.dto";
import { MatchService } from '../service/match.service';
import { ChatMessageDto } from '../dto/chatMessage.dto';

@ApiTags('matches')
@Controller('matches')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}
  
  @Get('user/:userId')
  @ApiResponse({ status: 200, description: 'Returns all matches for the user', type: [MatchResponseDto] })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getAllMatches(@Param('userId') userId: string): Promise<MatchResponseDto[]> {
    const matches = await this.matchService.getAllMatchesForUser(userId);
    return matches.map(match => MatchResponseDto.fromEntity(match));
  }

  @Get(':matchId')
  @ApiResponse({ status: 200, description: 'Returns the match with matchId', type: MatchResponseDto })
  @ApiResponse({ status: 404, description: 'Match not found' })
  async findMatchById(@Param('matchId') matchId: string): Promise<MatchResponseDto> {
    const match = await this.matchService.findMatchById(matchId);
    return MatchResponseDto.fromEntity(match, true);
  }

  @Delete(':matchId')
  @HttpCode(204)
  @ApiResponse({ status: 204, description: 'Removes a match'})
  @ApiResponse({ status: 404, description: 'Match not found' })
  async unmatchUser(@Param('matchId') matchId: string): Promise<void> {
    await this.matchService.deleteMatch(matchId);
  }

  @Post(':matchId/chat-messages')
  @ApiBody({ type: ChatMessageDto })
  @ApiResponse({ status: 201, description: 'Sends a message to the match' })
  @ApiResponse({ status: 404, description: 'Match not found' })
  async sendMessage(@Param('matchId') matchId: string, @Body() body: ChatMessageDto): Promise<void> {
    await this.matchService.sendMessage(matchId, body.sender, body.message);
  }
}
