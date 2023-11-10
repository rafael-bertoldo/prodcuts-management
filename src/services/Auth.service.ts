import 'dotenv/config'
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Login, LoginReturn, User } from "src/interfaces/user.interfaces";
import { PrismaService } from "./prisma.service";
import { compare } from "bcryptjs";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService
    ) { }

    async login({ password, registerNumber }: Login): Promise<LoginReturn> {
        const user: User = await this.prisma.user.findUnique({
            where: {
                registerNumber
            }
        })

        if (!user) throw new UnauthorizedException('Invalid credentials')

        const passMatch: boolean = await compare(password, user.password)

        if (!passMatch) throw new UnauthorizedException('Invalid credentials')

        const payload = {
            sub: user.id,
            name: user.name,
            active: user.active,
            registerNumber: user.registerNumber
        }

        return { token: await this.jwtService.signAsync(payload) }
    }
}