import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import type { StringValue } from 'ms';

import { validateEnv } from '@app/nest-zero-to-hero/env.validation';
import { typeOrmAsyncConfig } from '@app/nest-zero-to-hero/config/typeorm.config';

import { User } from '@app/nest-zero-to-hero/users/entities/user.entity';
import { UsersService } from '@app/nest-zero-to-hero/users/users.service';
import { Playlist } from '@app/nest-zero-to-hero/playlists/entities/playlist.entity';
import { Song } from '@app/nest-zero-to-hero/songs/song.entity';
import { Artist } from '@app/nest-zero-to-hero/artists/entities/artist.entity';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnv,
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),

    TypeOrmModule.forFeature([User, Playlist, Song, Artist]),

    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService): JwtModuleOptions => ({
        secret: configService.getOrThrow<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.getOrThrow<StringValue>('JWT_EXPIRATION'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService],
})
export class AuthServiceModule {}
