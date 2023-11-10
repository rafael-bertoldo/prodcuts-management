import { Body, Controller, HttpCode, HttpStatus, Post, UsePipes } from "@nestjs/common";
import { Login, LoginReturn } from "src/interfaces/user.interfaces";
import { ZodValidationPipe } from "src/pipes/validation.pipe";
import { loginSchema } from "src/schemas/user.schemas";
import { AuthService } from "src/services/Auth.service";

@Controller('auth')
export class AuthController{
  constructor(private service: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UsePipes(new ZodValidationPipe(loginSchema))
  async login(@Body() data: Login): Promise<LoginReturn> {
    return await this.service.login(data)
  }
}