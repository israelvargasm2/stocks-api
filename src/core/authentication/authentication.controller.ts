import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthenticationDatabaseRepositoryAdapter } from './adpaters/authentication-database-repository.adapter';
import { EncryptionService } from 'src/utils/encryption.service';
import { JwtService } from '@nestjs/jwt';

@Controller('authentication')
export class AuthenticationController {

    constructor(
        private readonly repoAdapter: AuthenticationDatabaseRepositoryAdapter,
        private readonly jwtService: JwtService
    ) { }

    @Post()
    async login(@Body("username") username: string, @Body("password") password: string) {
        const user = await this.repoAdapter.findUser(username);
        if (!user) throw new UnauthorizedException();
        const isAuthenticatedUser = EncryptionService.decryptPassword(password, user.password);
        if (!isAuthenticatedUser) throw new UnauthorizedException();
        const payload = { username: user.username, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
