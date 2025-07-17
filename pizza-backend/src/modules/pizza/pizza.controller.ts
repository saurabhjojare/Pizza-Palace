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
import { PizzaService } from './pizza.service';
import { CreatePizzaDto } from './dto/create-pizza.dto';
import { UpdatePizzaDto } from './dto/update-pizza.dto';
import { PizzaEntity } from './entities/pizza.entity';
import { ResponseInterceptor } from '../../common/interceptors/response.interceptor';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { role } from 'src/common/enums/role';

@Controller('pizzas')
@UseInterceptors(ResponseInterceptor)
export class PizzaController {
  constructor(private readonly pizzaService: PizzaService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(role.ADMIN, role.CUSTOMER)
  @Post()
  async create(@Body() createPizzaDto: CreatePizzaDto): Promise<PizzaEntity> {
    return this.pizzaService.create(createPizzaDto);
  }

  @Get()
  async findAll(): Promise<PizzaEntity[]> {
    return this.pizzaService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(role.ADMIN, role.CUSTOMER)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PizzaEntity> {
    return this.pizzaService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(role.ADMIN, role.CUSTOMER)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePizzaDto: UpdatePizzaDto,
  ): Promise<PizzaEntity> {
    await this.pizzaService.update(+id, updatePizzaDto);
    return this.pizzaService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(role.ADMIN, role.CUSTOMER)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.pizzaService.remove(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(role.ADMIN, role.CUSTOMER)
  @Post('search-by-name')
  async searchByName(@Body('name') name: string): Promise<PizzaEntity[]> {
    return this.pizzaService.searchByName(name);
  }
}
