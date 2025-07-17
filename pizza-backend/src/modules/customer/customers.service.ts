import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
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
    return await this.customersRepository.find({
      order: {
        created_at: 'DESC',
      },
    });
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

  async findByRole(
    role: string,
    excludeId?: number,
  ): Promise<CustomerEntity[]> {
    const whereCondition: any = {
      role,
    };

    if (excludeId !== undefined) {
      whereCondition.customer_id = Not(excludeId);
    }

    return await this.customersRepository.find({
      where: whereCondition,
      order: {
        created_at: 'DESC',
      },
    });
  }

  async getCustomerNameById(id: number): Promise<{ fullName: string }> {
    const customer = await this.customersRepository.findOne({
      where: { customer_id: id },
      select: ['first_name', 'last_name'],
    });

    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }

    const fullName = `${customer.first_name} ${customer.last_name}`;
    return { fullName };
  }

  async getCustomerAddressById(id: number): Promise<{ address: string }> {
    const customer = await this.customersRepository.findOne({
      where: { customer_id: id },
      select: ['address'],
    });

    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }

    return { address: customer.address };
  }

  async searchCustomers(search: string): Promise<CustomerEntity[]> {
    return this.searchByKeywordAndRole('customer', search);
  }

  async searchAdmins(search: string): Promise<CustomerEntity[]> {
    return this.searchByKeywordAndRole('admin', search);
  }

  async searchByKeywordAndRole(
    role: string,
    search: string,
  ): Promise<CustomerEntity[]> {
    const queryBuilder =
      this.customersRepository.createQueryBuilder('customer');

    queryBuilder.where('LOWER(customer.role) = LOWER(:role)', { role });

    if (search) {
      const searchTerm = `%${search.toLowerCase()}%`;

      queryBuilder.andWhere(
        `(LOWER(customer.first_name) LIKE :searchTerm OR
        LOWER(customer.last_name) LIKE :searchTerm OR
        LOWER(customer.address) LIKE :searchTerm OR
        LOWER(customer.email_address) LIKE :searchTerm OR
        customer.phone_number LIKE :searchTerm)`,
        { searchTerm },
      );
    }

    queryBuilder.orderBy('customer.created_at', 'DESC');

    return await queryBuilder.getMany();
  }
}
