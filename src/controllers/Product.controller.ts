import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, UsePipes } from "@nestjs/common";
import { AuthGuard } from "src/guards/Auth.guard";
import { ProductCreate, ProductReturnAll, ProductUpdate, Product as IProduct } from "src/interfaces/product.interfaces";
import { ZodValidationPipe } from "src/pipes/validation.pipe";
import { productCreateSchema, productUpdateSchema } from "src/schemas/product.schemas";
import { ProductService } from "src/services/Product.service";

interface ProductParam {
  id: string
}

@Controller('products')
@UseGuards(AuthGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  @UsePipes(new ZodValidationPipe(productCreateSchema))
  async create(@Body() data: ProductCreate): Promise<IProduct> {
    return this.productService.create(data)
  }

  @Get()
  async readAll(): Promise<ProductReturnAll> {
    return await this.productService.read()
  }

  @Get(':id')
  async readById(@Param() { id }: ProductParam): Promise<IProduct> {
    return await this.productService.readById(id)
  }

  @Patch(':id')
  @UsePipes(new ZodValidationPipe(productUpdateSchema))
  async update(@Param() { id }: ProductParam, @Body() data: ProductUpdate) {
    return await this.productService.update(id, data)
  }

  @Delete(':id')
  async delete(@Param() { id }: ProductParam) {
    return await this.productService.delete(id)
  }
}