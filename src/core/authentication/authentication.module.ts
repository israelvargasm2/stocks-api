import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationDatabaseRepositoryAdapter } from './adpaters/authentication-database-repository.adapter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrmEntity } from '../users/entities/user.orm-entity';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserOrmEntity]),
    PassportModule,
    JwtModule.register({
      secret: 'NCWUIBCJEWNCNWCBW78T32773JBWHEBDWE723JIUJD8832YHDYU23', // usa variables de entorno en producción
      signOptions: { expiresIn: '12h' },
    }),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationDatabaseRepositoryAdapter, JwtStrategy]
})
export class AuthenticationModule { }
