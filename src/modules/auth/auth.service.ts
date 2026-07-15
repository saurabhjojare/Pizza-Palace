import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { CustomerEntity } from '../customer/entities/customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(CustomerEntity)
    private customersRepository: Repository<CustomerEntity>,
  ) { }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.customersRepository.findOne({
      where: { email_address: email },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const result = { ...user };
      delete result.password;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      username: user.email_address,
      sub: user.customer_id,
      role: user.role,
      customer_id: user.customer_id,
    };
    return { access_token: this.jwtService.sign(payload) };
  }
}
