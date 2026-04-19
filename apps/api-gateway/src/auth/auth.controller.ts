import { Controller, Post, Body, Inject, UseGuards, Get, Req } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { LoginDto } from '@app/contracts';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { GatewayAuthGuard } from './guards/gateway-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class GatewayAuthController {
  constructor(@Inject('AUTH_SERVICE') private readonly authClient: ClientProxy) {}

  @Post('login')
  @ApiOperation({ summary: 'Login via Microservice' })
  login(@Body() loginDto: LoginDto) {
    console.log('Gateway: Received HTTP login request. Forwarding via TCP to Auth-Service...');

    return this.authClient.send({ cmd: 'login' }, loginDto);
  }

  @UseGuards(GatewayAuthGuard)
  @ApiBearerAuth()
  @Get('profile')
  @ApiOperation({ summary: 'Get current user profile (Tests Gateway JWT validation)' })
  getProfile(@Req() req: Request) {
    console.log('Gateway: Token is valid. Return profile.');
    return req['user'];
  }
}
