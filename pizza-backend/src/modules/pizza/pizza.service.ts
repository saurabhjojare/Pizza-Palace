import { Injectable } from '@nestjs/common';
import { CreatePizzaDto } from './dto/create-pizza.dto';
import { UpdatePizzaDto } from './dto/update-pizza.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PizzaEntity } from './entities/pizza.entity';
import { ILike, Repository } from 'typeorm';

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
    return await this.pizzaRepository.find({
      order: { created_at: 'DESC', pizza_id: 'DESC' },
    });
  }

  async findOne(id: number): Promise<PizzaEntity> {
    const pizza = await this.pizzaRepository.findOne({
      where: { pizza_id: id },
      order: { created_at: 'DESC' },
    });

    return pizza;
  }

  async update(
    id: number,
    updatePizzaDto: UpdatePizzaDto,
  ): Promise<PizzaEntity> {
    await this.pizzaRepository.update(id, updatePizzaDto);
    return this.pizzaRepository.findOneBy({ pizza_id: id });
  }

  async remove(id: number): Promise<void> {
    await this.pizzaRepository.delete(id);
  }

  async searchByName(name: string): Promise<PizzaEntity[]> {
    return await this.pizzaRepository.find({
      where: { name: ILike(`%${name}%`) },
      order: { created_at: 'DESC' },
    });
  }
}
