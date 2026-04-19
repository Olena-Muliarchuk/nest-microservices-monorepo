import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { GatewayAuthController } from './auth/auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validateEnv } from '@app/nest-zero-to-hero/env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnv,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
    ClientsModule.register([
      {
        name: 'HERO_SERVICE', // Uniqe token
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 3002, // The same port like in monolit
        },
      },
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 3003,
        },
      },
    ]),
  ],
  controllers: [ApiGatewayController, GatewayAuthController],
  providers: [ApiGatewayService],
})
export class ApiGatewayModule {}
