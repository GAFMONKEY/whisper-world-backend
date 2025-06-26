import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Not, Repository } from 'typeorm';
import { Match } from '../entity/match.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Match) private matchRepo: Repository<Match>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepo.find();
  }

  async findById(id: string): Promise<User | null> {
    return this.userRepo.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepo.findOne({ where: { email } });
  }

  // TODO: implement proper matching algorithm
  async findMatches(id: string): Promise<User[]> {
    const requestingUser = await this.findById(id);
    if (!requestingUser) {
      throw new NotFoundException('User not found');
    }
    const otherUsers = await this.userRepo.find({ where: { id: Not(id) } });
    const nonMatchedUsers = otherUsers.filter(user => user.allMatches.every(match => match.user2.id !== id || match.user1.id !== id));
    const nonLikedPassedMatched = nonMatchedUsers.filter(user => !(requestingUser.likedUsers.includes(user.id) || requestingUser.passedUsers.includes(user.id)));
    return nonLikedPassedMatched;
  }

  async likeUser(sourceUserId: string, targetUserId: string): Promise<{ matched: boolean, matchId?: string }> {
    const sourceUser = await this.findById(sourceUserId);
    const targetUser = await this.findById(targetUserId);

    if (!sourceUser || !targetUser) {
      throw new NotFoundException('User not found');
    }

    if (sourceUserId === targetUserId) {
      throw new BadRequestException('Cannot like yourself');
    }

    if (sourceUser.likedUsers.includes(targetUserId)) {
      return { matched: false };
    }

    if (sourceUser.passedUsers.includes(targetUserId)) {
      throw new BadRequestException('Cannot like a user you have already passed');
    }

    sourceUser.likedUsers.push(targetUserId);

    if (targetUser.likedUsers.includes(sourceUserId)) {
      const match = this.matchRepo.create({
        user1: sourceUser,
        user2: targetUser,
        matchedAt: new Date(),
      });
      const savedMatch = await this.matchRepo.save(match);

      sourceUser.likedUsers = sourceUser.likedUsers.filter((id) => id !== targetUserId);
      targetUser.likedUsers = targetUser.likedUsers.filter((id) => id !== sourceUserId);

      await this.userRepo.save([sourceUser, targetUser]);

      return { matched: true, matchId: savedMatch.id };
    }

    await this.userRepo.save(sourceUser);
    return { matched: false };
  }
  
  async passUser(sourceUserId: string, targetUserId: string): Promise<void> {
    const sourceUser = await this.userRepo.findOne({ where: { id: sourceUserId } });
    const targetUser = await this.userRepo.findOne({ where: { id: targetUserId } });
    
    if (!sourceUser || !targetUser) {
      throw new NotFoundException('User not found');
    }
    
    if (sourceUserId === targetUserId) {
      throw new BadRequestException('Cannot pass yourself');
    }
    
    if (sourceUser.passedUsers.includes(targetUserId)) {
      return;
    }
    
    if (sourceUser.likedUsers.includes(targetUserId)) {
      sourceUser.likedUsers = sourceUser.likedUsers.filter(id => id !== targetUserId);
    }
    
    sourceUser.passedUsers.push(targetUserId);
    
    await this.userRepo.save(sourceUser);
  }
  
  async userExists(userId: string): Promise<boolean> {
    const count = await this.userRepo.count({
      where: { id: userId }
    });
    return count > 0;
  }
}
