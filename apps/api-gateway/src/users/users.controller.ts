import { Controller, Get, UseGuards, Req, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { GatewayAuthGuard } from '../auth/guards/gateway-auth.guard';
import { catchError, firstValueFrom } from 'rxjs';
import type { Request } from 'express';
import { ActiveUser, User } from '@app/contracts';
import { AxiosError } from 'axios';

@ApiTags('users')
@Controller('users')
@UseGuards(GatewayAuthGuard)
@ApiBearerAuth()
export class GatewayUsersController {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all users (Proxied to Monolith)' })
  async findAll(@Req() req: Request & { user: ActiveUser }) {
    const monolithUrl = this.configService.getOrThrow<string>('MONOLITH_URL');
    const user = req.user;

    console.log(`Gateway: Proxying GET /users to monolith. User ID: ${req['user']?.userId}`);

    const { data } = await firstValueFrom(
      this.httpService
        .get<User[]>(`${monolithUrl}/users`, {
          headers: {
            'X-User-Id': user.userId,
            'X-User-Role': user.role,
          },
          params: req.query,
        })
        .pipe(
          catchError((error: AxiosError) => {
            console.error('Gateway Error proxying to monolith:', error.message);
            throw new HttpException(
              error.response?.data || 'Internal Gateway Proxy Error',
              error.response?.status || 500,
            );
          }),
        ),
    );

    return data;
  }
}
