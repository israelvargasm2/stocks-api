import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService
    ) { }

    login(user: UserEntity) {
        const payload = { email: user.email, name: user.name };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
