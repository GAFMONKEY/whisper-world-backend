import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from "./entity/entities";
import { UserController } from "./controller/user.controller";
import { UserService } from "./service/user.service";
import { AuthController } from "./controller/auth.controller";
import { AuthService } from "./service/authService";
import { MatchController } from './controller/match.controller';
import { MatchService } from './service/match.service';


@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  controllers: [UserController, AuthController, MatchController],
  providers: [UserService, MatchService, AuthService],
  exports: [UserService, MatchService, AuthService],
})
export class UserModule {}
