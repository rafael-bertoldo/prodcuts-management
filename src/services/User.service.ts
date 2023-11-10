import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { User, UserCreate, UserReturn, UserUpdate } from '../interfaces/user.interfaces';
import { userReadAllSchema, userReadSchema } from '../schemas/user.schemas';
import { hashSync } from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser({
    name,
    password,
    registerNumber,
  }: UserCreate): Promise<any> {
    const checkUser: User = await this.prisma.user.findUnique({
      where: {
        registerNumber
      }
    })

    if(checkUser) throw new ConflictException('Register number already exists')
    const hashedPassword: string = hashSync(password, 10);
    const user: User = await this.prisma.user.create({
      data: {
        name,
        password: hashedPassword,
        registerNumber,
      },
    });

    return userReadSchema.parse(user);
  }

  async update(id: string, data: UserUpdate): Promise<UserReturn> {
    const user = await this.prisma.user.findUnique({
      where: {
        id
      }
    })

    if(!user) throw new NotFoundException('User not found')

    if(data.password) {
      data.password = hashSync(data.password, 10)
    }

    const updated = await this.prisma.user.update({
      where: {
        id
      },
      data
    })

    return userReadSchema.parse(updated)
  }

  async readAll() {
    return userReadAllSchema.parse(await this.prisma.user.findMany())
  }

  async delete(id: string): Promise<{message: string}> {
    const user = await this.prisma.user.findUnique({
      where: {
        id
      }
    })

    if(!user) throw new NotFoundException('User not found')

    await this.prisma.user.update({
      where: {
        id
      },
      data: {
        active: false
      }
    })

    return {message: 'user successfully deleted'}
  }
}
