import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { Product, ProductCreate, ProductUpdate } from "src/interfaces/product.interfaces";

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) { }

  async create({ codebar, description, batch, name, quantity, unityPrice, dueDate }: ProductCreate) {
    const product: Product | null = await this.prisma.product.findUnique({
      where: {
        codebar
      }
    })

    if(product) throw new ConflictException('Product already exists')

    return await this.prisma.product.create({
      data: {
        codebar,
        description,
        batch,
        name,
        quantity,
        unityPrice,
        dueDate
      }
    })
  }

  async read() { 
    return this.prisma.product.findMany()
   }

   async readById(id: string) {
    const product: Product = await this.prisma.product.findUnique({
      where: {
        id
      }
    })

    if(!product) throw new NotFoundException('Product not found')

    return product
   }

  async update(id: string, data: ProductUpdate) { 
    const product: Product = await this.prisma.product.findUnique({
      where: {
        id
      }
    })

    if(!product) throw new NotFoundException('Product not found')

    return await this.prisma.product.update({
      where: {
        id
      },
      data
    })
   }

  async delete(id: string) {
    const product: Product = await this.prisma.product.findUnique({
      where: {
        id
      }
    })

    if(!product) throw new NotFoundException('Product not found')

    return await this.prisma.product.delete({
      where: {
        id
      }
    })
   }
}