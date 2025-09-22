import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy, StrategyOptions } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { UserEntity } from '../users/entities/user.entity';
import { UsersPostgresAdapter } from '../users/adapters/users-postgres.adapter';
import { GetUserByEmailUseCase } from '../users/use-cases/get-user-by-email.use-case';
import { SaveUserUseCase } from '../users/use-cases/save-user.use-case';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(
        configService: ConfigService,
        private readonly usersPostgresAdapter: UsersPostgresAdapter
    ) {
        super({
            clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
            clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET'),
            callbackURL: configService.get<string>('GOOGLE_CALLBACK_URL'),
            scope: ['email', 'profile'],
        } as StrategyOptions);
    }

    async validate(accessToken: string, refreshToken: string, profile: any): Promise<UserEntity> {
        const { name, emails, photos, provider } = profile;
        const email = emails[0].value;
        try {
            let user = await new GetUserByEmailUseCase(this.usersPostgresAdapter).execute(email);
            if (!user) {
                user = await new SaveUserUseCase(this.usersPostgresAdapter).execute({
                    email,
                    name: name.givenName,
                    picture: photos[0].value,
                    provider
                });
            }
            return user;
        } catch (err) {
            throw new Error(err.message);
        }
    }
}
