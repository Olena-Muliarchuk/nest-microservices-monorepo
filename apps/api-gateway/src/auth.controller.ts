import { Controller, Post, Body, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { LoginDto } from '@app/contracts';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

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
}
