import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { OrderLineService } from './order-line.service';
import { CreateOrderLineDto } from './dto/create-order-line.dto';
import { UpdateOrderLineDto } from './dto/update-order-line.dto';
import { OrderLineEntity } from './entities/order-line.entity';
import { ResponseInterceptor } from '../../common/interceptors/response.interceptor';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { role } from 'src/common/enums/role';

@Controller('order-line')
@UseInterceptors(ResponseInterceptor)
export class OrderLineController {
  constructor(private readonly orderLineService: OrderLineService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(role.CUSTOMER)
  @Post()
  async create(
    @Body() createOrderLineDto: CreateOrderLineDto,
  ): Promise<OrderLineEntity> {
    const orderLine = await this.orderLineService.create(createOrderLineDto);
    return orderLine;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(role.ADMIN)
  @Get()
  async findAll(): Promise<OrderLineEntity[]> {
    return this.orderLineService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(role.ADMIN)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<OrderLineEntity> {
    return this.orderLineService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(role.ADMIN)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrderLineDto: UpdateOrderLineDto,
  ): Promise<OrderLineEntity> {
    await this.orderLineService.update(+id, updateOrderLineDto);
    return this.orderLineService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(role.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.orderLineService.remove(+id);
  }
}
