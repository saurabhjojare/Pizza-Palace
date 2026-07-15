import { Module } from '@nestjs/common';
import { PizzaService } from './pizza.service';
import { PizzaController } from './pizza.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PizzaEntity } from './entities/pizza.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PizzaEntity])],
  controllers: [PizzaController],
  providers: [PizzaService],
})
export class PizzaModule {}
