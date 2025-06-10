import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Match } from "../entity/match.entity";
import { UserService } from './user.service';

@Injectable()
export class MatchService {
  constructor(@InjectRepository(Match) private matchRepo: Repository<Match>, private userService: UserService) {}
  
  async getAllMatchesForUser(userId: string): Promise<Match[]> {
    const userExists = await this.userService.userExists(userId);
    if (!userExists) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return await this.matchRepo.find({
      where: [
        { user1: { id: userId } },
        { user2: { id: userId } }
      ],
      relations: ['user1', 'user2', 'chatMessages']
    });
  }
  
  async findMatchById(matchId: string): Promise<Match> {
    const match = await this.matchRepo.findOne({
      where: { id: matchId },
      relations: ['user1', 'user2', 'chatMessages']
    });
    
    if (!match) {
      throw new NotFoundException('Match not found');
    }
    
    return match;
  }
  
  async deleteMatch(matchId: string): Promise<void> {
    const match = await this.matchRepo.findOne({
      where: { id: matchId }
    });
    
    if (!match) {
      throw new NotFoundException('Match not found');
    }
    
    await this.matchRepo.remove(match);
  }
}
