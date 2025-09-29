import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrmEntity } from '../users/entities/user-orm.entity';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { UsersPostgresAdapter } from '../users/adapters/users-postgres.adapter';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: {  },
      }),
    }),
    TypeOrmModule.forFeature([UserOrmEntity])
  ],
  controllers: [
    AuthController
  ],
  providers: [
    AuthService,
    JwtStrategy,
    UsersPostgresAdapter
  ],
})
export class AuthenticationModule { }
