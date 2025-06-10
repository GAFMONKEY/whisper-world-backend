import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from "../entity/user.entity";

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}
  
  async login(email: string, password: string): Promise<User> {
    const user = await this.userService.findByEmail(email);
    if (!user || user.password !== password) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }
}
