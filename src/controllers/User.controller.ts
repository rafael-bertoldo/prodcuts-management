import {Body, Controller, Get, Post, Patch, Request, Response, UseGuards, UsePipes, Delete, Param} from '@nestjs/common';
import { UserService } from '../services/User.service';
import {ZodValidationPipe} from "../pipes/validation.pipe";
import {userCreateSchema} from "../schemas/user.schemas";
import { AuthGuard } from 'src/guards/Auth.guard';
import { Public } from 'src/decorators/publicRoute.decorator';
import { User, UserCreate, UserUpdate } from 'src/interfaces/user.interfaces';

@Controller('users')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Public()
  @UsePipes(new ZodValidationPipe(userCreateSchema))
  async create(@Body() data: UserCreate): Promise<User> {
    return this.userService.createUser(data);
  }

  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user
  }

  @Patch('profile')
  async update(@Request() req: any, @Body() data: UserUpdate): Promise<User> {
    return await this.userService.update(req.user.sub, data)
  }

  @Get()
  async getAll() {
    return await this.userService.readAll()
  }

  @Patch(':id')
  async adminUpdate(@Param() params: any, @Body() data: UserUpdate): Promise<User> {
    return await this.userService.update(params.id, data)
  }

  @Delete(':id')
  async delete(@Param() params: any): Promise<{message: string}> {
    const res: {message: string} = await this.userService.delete(params.id)

    return res
  }
}
