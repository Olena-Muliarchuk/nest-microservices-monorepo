import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { LoginDto, type ActiveUser } from '@app/contracts';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'login' })
  async login(@Payload() loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);

    if (!user) {
      throw new RpcException('Invalid credentials');
    }

    return this.authService.login(user);
  }

  @MessagePattern({ cmd: 'refresh' })
  refresh(@Payload() user: ActiveUser) {
    return this.authService.refreshTokens(user);
  }

  @MessagePattern({ cmd: 'logout' })
  async logout(@Payload() user: ActiveUser) {
    return this.authService.logout(user.userId);
  }

  @MessagePattern({ cmd: 'profile' })
  getProfile(@Payload() user: ActiveUser) {
    return user;
  }
}
