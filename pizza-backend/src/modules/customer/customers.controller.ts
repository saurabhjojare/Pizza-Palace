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
  BadRequestException,
  Query,
} from '@nestjs/common';
import { ResponseInterceptor } from '../../common/interceptors/response.interceptor';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomerEntity } from './entities/customer.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Role } from 'src/common/enums/Role';
import { Roles } from '../auth/roles.decorator';

@Controller('customers')
@UseInterceptors(ResponseInterceptor)
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  async create(
    @Body() createCustomerDto: CreateCustomerDto,
  ): Promise<CustomerEntity> {
    return this.customersService.create(createCustomerDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  async findAll(): Promise<CustomerEntity[]> {
    return this.customersService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post('by-role')
  async findByRole(@Body('role') role: string): Promise<CustomerEntity[]> {
    return this.customersService.findByRole(role);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.CUSTOMER, Role.ADMIN)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CustomerEntity> {
    const customerId = parseInt(id, 10);
    if (isNaN(customerId)) {
      throw new BadRequestException('Invalid customer ID');
    }
    return this.customersService.findOne(customerId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.CUSTOMER)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ): Promise<CustomerEntity> {
    return this.customersService.update(+id, updateCustomerDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.CUSTOMER)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.customersService.remove(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.CUSTOMER)
  @Get(':id/full-name')
  async getCustomerName(
    @Param('id') id: string,
  ): Promise<{ fullName: string }> {
    const customerId = parseInt(id, 10);
    if (isNaN(customerId)) {
      throw new BadRequestException('Invalid customer ID');
    }
    return this.customersService.getCustomerNameById(customerId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.CUSTOMER)
  @Get(':id/address')
  async getCustomerAddress(
    @Param('id') id: string,
  ): Promise<{ address: string }> {
    const customerId = parseInt(id, 10);
    if (isNaN(customerId)) {
      throw new BadRequestException('Invalid customer ID');
    }
    return this.customersService.getCustomerAddressById(customerId);
  }

  @Get('search/customers')
  async searchCustomers(@Query('q') query: string) {
    return this.customersService.searchCustomers(query);
  }

  @Get('search/admins')
  async searchAdmins(@Query('q') query: string) {
    return this.customersService.searchAdmins(query);
  }
}
