import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from "../service/auth.service";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { LoginDto } from "../dto/login.dto";
import { UserResponseDto } from "../dto/userResponse.dto";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  
  @Post('login')
  @HttpCode(200)
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'Returns the users data', type: UserResponseDto })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.authService.login(body.email, body.password);
    return UserResponseDto.fromEntity(user);
  }
}
