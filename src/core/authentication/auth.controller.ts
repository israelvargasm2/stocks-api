import { BadRequestException, Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth() {
        // Redirige a Google
    }

    @Get('google/redirect')
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Req() req: any) {
        try {
            return this.authService.login(req.user); // Retorna un JWT
        } catch (err) {
            throw new BadRequestException(err.message);
        }
    }
}
