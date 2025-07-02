import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Match } from '../entity/match.entity';
import { UserService } from './user.service';
import { ChatMessage } from '../entity/chat-message.entity';

@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(Match)
    private matchRepo: Repository<Match>,
    @InjectRepository(ChatMessage)
    private chatMessageRepository: Repository<ChatMessage>,
    private userService: UserService,
  ) {}

  async getAllMatchesForUser(userId: string): Promise<Match[]> {
    const userExists = await this.userService.userExistsById(userId);
    if (!userExists) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return await this.matchRepo.find({
      where: [{ user1: { id: userId } }, { user2: { id: userId } }],
      relations: ['user1', 'user2', 'chatMessages'],
    });
  }

  async findMatchById(matchId: string): Promise<Match> {
    const match = await this.matchRepo.findOne({
      where: { id: matchId },
      relations: ['user1', 'user2', 'chatMessages', 'chatMessages.sender', "chatMessages.match"],
    });

    if (!match) {
      throw new NotFoundException('Match not found');
    }

    if (match.chatMessages) {
      match.chatMessages.sort((a, b) => {
        const dateA = new Date(a.sentAt);
        const dateB = new Date(b.sentAt);
        return dateA.getTime() - dateB.getTime() ;
      });
    }
    
    return match;
  }

  async deleteMatch(matchId: string): Promise<void> {
    const match = await this.matchRepo.findOne({
      where: { id: matchId },
    });

    if (!match) {
      throw new NotFoundException('Match not found');
    }

    await this.matchRepo.remove(match);
  }
  
  async sendMessage(matchId: string, senderId: string, messageText: string): Promise<void> {
    const match = await this.findMatchById(matchId);
    
    const sender = await this.userService.findById(senderId);
    if (!sender) {
      throw new NotFoundException('Sender not found');
    }
    
    if (!(sender.id === match.user1.id || sender.id === match.user2.id)) {
      throw new BadRequestException('Sender not part of this match');
    }
    
    const chatMessage = new ChatMessage();
    chatMessage.message = messageText;
    chatMessage.sender = sender;
    chatMessage.match = match;
    
    await this.chatMessageRepository.save(chatMessage);
  }
}
