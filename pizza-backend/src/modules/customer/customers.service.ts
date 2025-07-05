import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerEntity } from './entities/customer.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly customersRepository: Repository<CustomerEntity>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<CustomerEntity> {
    try {
      const hashedPassword = await bcrypt.hash(createCustomerDto.password, 10);
      const customer = this.customersRepository.create({
        ...createCustomerDto,
        password: hashedPassword,
      });
      return await this.customersRepository.save(customer);
    } catch (error) {
      throw new BadRequestException(
        'Invalid data provided for customer creation',
      );
    }
  }

  async findAll(): Promise<CustomerEntity[]> {
    return await this.customersRepository.find();
  }

  async findOne(id: number): Promise<CustomerEntity> {
    const customer = await this.customersRepository.findOne({
      where: { customer_id: id },
    });
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
    return customer;
  }

  async update(
    id: number,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<CustomerEntity> {
    const result = await this.customersRepository.update(id, updateCustomerDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
    const updatedCustomer = await this.customersRepository.findOne({
      where: { customer_id: id },
    });
    if (!updatedCustomer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
    return updatedCustomer;
  }

  async remove(id: number): Promise<void> {
    const result = await this.customersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
  }
}
