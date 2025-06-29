import { Body, Controller, Get, HttpCode, NotFoundException, Param, Post } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserResponseDto } from '../dto/userResponse.dto';
import { UserCreateDTO } from '../dto/userCreate.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Returns all users', type: [UserResponseDto] })
  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.userService.findAll();
    return users.map((user) => UserResponseDto.fromEntity(user));
  }

  @Get(':userId')
  @ApiResponse({ status: 200, description: 'Return user with userId', type: [UserResponseDto] })
  @ApiResponse({ status: 404, description: 'User not found' })
  async findUserById(@Param('userId') userId: string): Promise<UserResponseDto> {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return UserResponseDto.fromEntity(user);
  }

  @Get(':userId/discover')
  @ApiResponse({
    status: 200,
    description: 'Returns list of potential matches for the user with userId',
    type: [UserResponseDto],
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  async findMatches(@Param('userId') userId: string) {
    return this.userService.findPotentialMatches(userId);
  }

  @Post(':sourceUserId/like/:targetUserId')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Likes a user',
    schema: {
      type: 'object',
      properties: { matched: { type: 'boolean' }, matchId: { type: 'string', nullable: true } },
    },
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  async likeUser(
    @Param('sourceUserId') sourceUserId: string,
    @Param('targetUserId') targetUserId: string,
  ) {
    return this.userService.likeUser(sourceUserId, targetUserId);
  }

  @Post(':sourceUserId/pass/:targetUserId')
  @ApiResponse({ status: 200, description: 'Passes a user' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async passUser(
    @Param('sourceUserId') sourceUserId: string,
    @Param('targetUserId') targetUserId: string,
  ) {
    return this.userService.passUser(sourceUserId, targetUserId);
  }
  
  @Post()
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 409, description: 'User with email already exists' })
  async createUser(@Body() userDTO: UserCreateDTO) {
    return this.userService.createUser(userDTO);
  }
}
