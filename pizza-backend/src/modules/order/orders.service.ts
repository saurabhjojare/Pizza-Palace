import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Brackets, Like, Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderEntity } from './entities/order.entity';
import { OrderLineEntity } from '../order-line/entities/order-line.entity';
import { PizzaEntity } from '../pizza/entities/pizza.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,

    @InjectRepository(OrderLineEntity)
    private readonly orderLineRepository: Repository<OrderLineEntity>,

    @InjectRepository(PizzaEntity)
    private readonly pizzaRepository: Repository<PizzaEntity>,
  ) {}

  private readonly validSizes = ['regular', 'medium', 'large'];

  private calculateTotalLineAmount(
    pizza: PizzaEntity,
    size: string,
    quantity: number,
  ): number {
    const sizeLower = size.toLowerCase();

    if (!this.validSizes.includes(sizeLower)) {
      throw new BadRequestException('Invalid pizza size');
    }

    let price = 0;
    switch (sizeLower) {
      case 'regular':
        price = Number(pizza.regularPrice);
        break;
      case 'medium':
        price = Number(pizza.mediumPrice);
        break;
      case 'large':
        price = Number(pizza.largePrice);
        break;
    }

    return price * quantity;
  }

  async create(createOrderDto: CreateOrderDto): Promise<string> {
    const { customer_id, delivery_address, status, orderLines } =
      createOrderDto;

    const order = this.orderRepository.create({
      customer_id,
      delivery_address,
      status: Boolean(status),
      total_amount: 0,
    });

    const savedOrder = await this.orderRepository.save(order);

    let totalAmount = 0;

    for (const line of orderLines) {
      const pizza = await this.pizzaRepository.findOne({
        where: { pizza_id: line.pizza_id },
      });

      if (!pizza) {
        throw new NotFoundException(`Pizza with ID ${line.pizza_id} not found`);
      }

      const lineAmount = this.calculateTotalLineAmount(
        pizza,
        line.size,
        line.quantity,
      );

      totalAmount += lineAmount;

      const orderLine = this.orderLineRepository.create({
        order: { order_id: savedOrder.order_id },
        pizza_id: line.pizza_id,
        size: line.size,
        quantity: line.quantity,
        total_amount: lineAmount,
      });

      await this.orderLineRepository.save(orderLine);
    }

    await this.orderRepository.update(savedOrder.order_id, {
      total_amount: totalAmount,
    });

    return `Order #${savedOrder.order_id} has been successfully created.`;
  }
  async findAll(): Promise<OrderEntity[]> {
    return this.orderRepository.find({
      relations: ['orderLines'],
      order: { created_at: 'DESC' },
    });
  }

  async getOrdersByCustomerId(customerId: number): Promise<OrderEntity[]> {
    const orders = await this.orderRepository.find({
      where: { customer_id: customerId },
      relations: ['orderLines'],
      order: { created_at: 'DESC' },
    });

    if (!orders || orders.length === 0) {
      throw new NotFoundException(
        `No orders found for customer ID ${customerId}`,
      );
    }

    return orders;
  }

  async findOne(id: number): Promise<OrderEntity> {
    const order = await this.orderRepository.findOne({
      where: { order_id: id },
      relations: ['orderLines'],
    });

    if (!order) {
      throw new NotFoundException(`Order #${id} not found`);
    }

    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<string> {
    const order = await this.orderRepository.preload({
      order_id: id,
      ...updateOrderDto,
    });

    if (!order) {
      throw new NotFoundException(`Order #${id} not found`);
    }

    await this.orderRepository.save(order);
    return `Order #${id} has been successfully updated.`;
  }

  async remove(id: number): Promise<void> {
    const order = await this.findOne(id);
    await this.orderRepository.remove(order);
  }

  async getOrdersByFilter(
    name?: string,
    date?: string,
  ): Promise<OrderEntity[]> {
    const query = this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.customer', 'customer')
      .leftJoinAndSelect('order.orderLines', 'orderLine')
      .orderBy('order.created_at', 'DESC'); // Sort by created_at in descending order (latest first)

    if (!name && !date) {
      throw new BadRequestException(
        'At least one filter (name or date) is required',
      );
    }

    if (name) {
      const trimmedName = name.trim().toLowerCase();
      query.andWhere(
        new Brackets((qb) => {
          qb.where('LOWER(customer.first_name) LIKE :name', {
            name: `%${trimmedName}%`,
          }).orWhere('LOWER(customer.last_name) LIKE :name', {
            name: `%${trimmedName}%`,
          });
        }),
      );
    }

    if (date) {
      const parsedDate = new Date(date);
      if (isNaN(parsedDate.getTime())) {
        throw new BadRequestException('Invalid date format');
      }

      const startOfDay = new Date(parsedDate.setUTCHours(0, 0, 0, 0));
      const endOfDay = new Date(parsedDate.setUTCHours(23, 59, 59, 999));

      query.andWhere('order.order_time BETWEEN :start AND :end', {
        start: startOfDay.toISOString(),
        end: endOfDay.toISOString(),
      });
    }

    return query.getMany();
  }

  async getOrdersByCustomerAndDate(
    customerId: number,
    date: string,
  ): Promise<OrderEntity[]> {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      throw new BadRequestException('Invalid date format');
    }

    const startOfDay = new Date(parsedDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(parsedDate.setHours(23, 59, 59, 999));

    const orders = await this.orderRepository.find({
      where: {
        customer_id: customerId,
        order_time: Between(startOfDay, endOfDay),
      },
      relations: ['orderLines'],
      order: { created_at: 'DESC' },
    });

    return orders;
  }
}
