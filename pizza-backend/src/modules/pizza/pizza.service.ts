import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreatePizzaDto } from './dto/create-pizza.dto';
import { UpdatePizzaDto } from './dto/update-pizza.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PizzaEntity } from './entities/pizza.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PizzaService {
  constructor(
    @InjectRepository(PizzaEntity)
    private readonly pizzaRepository: Repository<PizzaEntity>,
  ) {}

  async create(createPizzaDto: CreatePizzaDto): Promise<PizzaEntity> {
    const pizza = this.pizzaRepository.create(createPizzaDto);
    return await this.pizzaRepository.save(pizza);
  }

  async findAll(): Promise<PizzaEntity[]> {
    return await this.pizzaRepository.find();
  }

  async findOne(id: number): Promise<PizzaEntity> {
    const pizza = await this.pizzaRepository.findOneBy({ pizza_id: id });
    if (!pizza) {
      throw new NotFoundException(`Pizza with ID ${id} not found`);
    }
    return pizza;
  }

  async update(
    id: number,
    updatePizzaDto: UpdatePizzaDto,
  ): Promise<PizzaEntity> {
    const pizza = await this.findOne(id);
    await this.pizzaRepository.update(id, updatePizzaDto);
    return this.pizzaRepository.findOneBy({ pizza_id: id });
  }

  async remove(id: number): Promise<void> {
    const pizza = await this.findOne(id);
    await this.pizzaRepository.delete(id);
  }
}
