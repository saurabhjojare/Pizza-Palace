import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateOrderLineDto } from './dto/create-order-line.dto';
import { UpdateOrderLineDto } from './dto/update-order-line.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderLineEntity } from './entities/order-line.entity';
import { PizzaEntity } from '../pizza/entities/pizza.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderLineService {
  constructor(
    @InjectRepository(OrderLineEntity)
    private readonly orderLineRepository: Repository<OrderLineEntity>,

    @InjectRepository(PizzaEntity)
    private readonly pizzaRepository: Repository<PizzaEntity>,
  ) {}

  async create(
    createOrderLineDto: CreateOrderLineDto,
  ): Promise<OrderLineEntity> {
    const { pizza_id, size, quantity } = createOrderLineDto;

    const pizza = await this.pizzaRepository.findOne({
      where: { pizza_id },
    });

    if (!pizza) {
      throw new NotFoundException(`Pizza with ID ${pizza_id} not found`);
    }

    const price = this.getPriceBySize(pizza, size);
    const total_amount = price * quantity;

    const orderLine = this.orderLineRepository.create({
      ...createOrderLineDto,
      total_amount,
    });

    return await this.orderLineRepository.save(orderLine);
  }

  findAll(): Promise<OrderLineEntity[]> {
    return this.orderLineRepository.find();
  }

  async findOne(id: number): Promise<OrderLineEntity> {
    const orderLine = await this.orderLineRepository.findOne({
      where: { orderline_id: id },
    });

    if (!orderLine) {
      throw new NotFoundException(`Order line with ID ${id} not found`);
    }

    return orderLine;
  }

  async update(
    id: number,
    updateOrderLineDto: UpdateOrderLineDto,
  ): Promise<OrderLineEntity> {
    const existingOrderLine = await this.findOne(id);

    const updatedFields = {
      ...existingOrderLine,
      ...updateOrderLineDto,
    };

    const pizza = await this.pizzaRepository.findOne({
      where: { pizza_id: updatedFields.pizza_id },
    });

    if (!pizza) {
      throw new NotFoundException(
        `Pizza with ID ${updatedFields.pizza_id} not found`,
      );
    }

    const price = this.getPriceBySize(pizza, updatedFields.size);
    updatedFields.total_amount = price * updatedFields.quantity;

    await this.orderLineRepository.update({ orderline_id: id }, updatedFields);

    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const orderLine = await this.findOne(id);
    await this.orderLineRepository.remove(orderLine);
  }

  private getPriceBySize(pizza: PizzaEntity, size: string): number {
    switch (size.toLowerCase()) {
      case 'regular':
        return Number(pizza.regularPrice);
      case 'medium':
        return Number(pizza.mediumPrice);
      case 'large':
        return Number(pizza.largePrice);
      default:
        throw new BadRequestException(
          `Invalid size '${size}'. Must be one of: regular, medium, large`,
        );
    }
  }
}
