import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'NCWUIBCJEWNCNWCBW78T32773JBWHEBDWE723JIUJD8832YHDYU23', // usa variables de entorno
        });
    }

    async validate(payload: any) {
        return { userId: payload.sub, username: payload.username };
    }
}
