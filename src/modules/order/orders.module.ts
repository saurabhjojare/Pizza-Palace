import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrderEntity } from './entities/order.entity';
import { CustomerEntity } from '../customer/entities/customer.entity';
import { PizzaEntity } from '../pizza/entities/pizza.entity';
import { OrderLineEntity } from './entities/order-line.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderEntity,
      OrderLineEntity,
      CustomerEntity,
      PizzaEntity,
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule { }
