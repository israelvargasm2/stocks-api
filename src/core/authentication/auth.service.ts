import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';
import { ConfigService } from '@nestjs/config';
import { UsersPostgresAdapter } from '../users/adapters/users-postgres.adapter';
import { GetUserByEmailUseCase } from '../users/use-cases/get-user-by-email.use-case';
import { SaveUserUseCase } from '../users/use-cases/save-user.use-case';
import { UserEntity } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
    private client: OAuth2Client;

    constructor(
        private jwtService: JwtService,
        private configService: ConfigService,
        private readonly usersPostgresAdapter: UsersPostgresAdapter
    ) {
        this.client = new OAuth2Client(configService.get<string>('GOOGLE_CLIENT_ID'));
    }

    async loginWithGoogle(token: string) {
        try {
            const ticket = await this.client.verifyIdToken({
                idToken: token,
                audience: this.configService.get<string>('GOOGLE_CLIENT_ID'),
            });

            const payload = ticket.getPayload();

            let user: UserEntity | null = null;

            if (payload?.email) {
                user = await new GetUserByEmailUseCase(this.usersPostgresAdapter).execute(payload.email);
                if (!user) {
                    user = await new SaveUserUseCase(this.usersPostgresAdapter).execute({
                        email: payload.email,
                        name: payload?.given_name,
                        picture: payload?.picture,
                        provider: "google"
                    });
                }
            }

            const appJwt = this.jwtService.sign({
                email: payload?.email,
                name: payload?.name,
                picture: payload?.picture,
            });

            return {
                access_token: appJwt,
                user,
            };
        } catch (err) {
            throw new Error(err.message);
        }
    }
}
